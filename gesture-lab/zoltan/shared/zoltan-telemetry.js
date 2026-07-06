(function () {
  let current = null;
  const sessions = [];

  function now() {
    return Date.now();
  }

  function safeEnv() {
    return {
      viewport: { width: innerWidth, height: innerHeight },
      orientation: innerWidth >= innerHeight ? 'landscape' : 'portrait',
      userAgent: navigator.userAgent.replace(/\([^)]*\)/g, '(...)').slice(0, 180),
      language: navigator.language || '',
      path: location.pathname
    };
  }

  function startSession(module, meta) {
    current = {
      module: module || 'zoltan',
      sessionId: `qa_${Math.random().toString(36).slice(2)}_${now()}`,
      startedAt: now(),
      endedAt: null,
      environment: safeEnv(),
      meta: Object.assign({}, meta || {}),
      interactionMode: null,
      cameraRequested: false,
      cameraGranted: false,
      cameraDenied: false,
      fallbackUsed: false,
      timeToFirstAction: null,
      timeToReveal: null,
      rewardActionClicked: null,
      errors: [],
      interactions: [],
      gestureAttempts: [],
      testerNotes: ''
    };
    sessions.push(current);
    return current;
  }

  function ensure() {
    if (!current) startSession('zoltan-auto');
    return current;
  }

  function recordInteraction(type, payload) {
    const session = ensure();
    if (session.timeToFirstAction === null) session.timeToFirstAction = now() - session.startedAt;
    session.interactionMode = payload && payload.mode ? payload.mode : session.interactionMode;
    session.interactions.push({ type, payload: Object.assign({}, payload || {}), at: now() });
  }

  function recordGestureAttempt(payload) {
    const session = ensure();
    session.gestureAttempts.push(Object.assign({ at: now() }, payload || {}));
  }

  function recordFallback(reason) {
    const session = ensure();
    session.fallbackUsed = true;
    session.interactions.push({ type: 'fallback', reason: reason || 'unknown', at: now() });
  }

  function recordError(error, context) {
    const session = ensure();
    session.errors.push({ message: error && error.message ? error.message : String(error || 'Unknown error'), context: context || '', at: now() });
  }

  function recordEnvironment(extra) {
    const session = ensure();
    session.environment = Object.assign(session.environment || {}, safeEnv(), extra || {});
  }

  function endSession(payload) {
    const session = ensure();
    session.endedAt = now();
    if (payload && payload.revealed) session.timeToReveal = now() - session.startedAt;
    if (payload && payload.rewardActionClicked) session.rewardActionClicked = payload.rewardActionClicked;
    return session;
  }

  function getSessionSummary() {
    const session = ensure();
    return {
      module: session.module,
      sessionId: session.sessionId,
      durationMs: (session.endedAt || now()) - session.startedAt,
      environment: session.environment,
      cameraRequested: session.cameraRequested,
      cameraGranted: session.cameraGranted,
      cameraDenied: session.cameraDenied,
      fallbackUsed: session.fallbackUsed,
      timeToFirstAction: session.timeToFirstAction,
      timeToReveal: session.timeToReveal,
      rewardActionClicked: session.rewardActionClicked,
      errors: session.errors,
      interactionCount: session.interactions.length,
      gestureAttempts: session.gestureAttempts.length
    };
  }

  function exportTelemetryJson() {
    return JSON.stringify({ current: getSessionSummary(), sessions }, null, 2);
  }

  function clearTelemetry() {
    sessions.length = 0;
    current = null;
  }

  window.ZoltanTelemetry = {
    startSession,
    endSession,
    recordInteraction,
    recordGestureAttempt,
    recordFallback,
    recordError,
    recordEnvironment,
    getSessionSummary,
    exportTelemetryJson,
    clearTelemetry
  };

  window.__ZOLTAN_EXPORT_QA__ = function () {
    return window.ZoltanTelemetry.exportTelemetryJson();
  };
})();
