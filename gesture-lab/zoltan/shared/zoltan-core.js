(function () {
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * clamp(t, 0, 1);
  }

  function mapRange(value, inMin, inMax, outMin, outMax) {
    if (inMax === inMin) return outMin;
    return lerp(outMin, outMax, (value - inMin) / (inMax - inMin));
  }

  function safeRandom(seed) {
    let x = Math.sin(seed || Date.now()) * 10000;
    return function next() {
      x = Math.sin(x) * 10000;
      return x - Math.floor(x);
    };
  }

  function createDwellTracker(durationMs) {
    let targetId = null;
    let startedAt = 0;
    const duration = durationMs || 800;
    return {
      update(nextTargetId, now) {
        const time = now || performance.now();
        if (!nextTargetId) {
          targetId = null;
          startedAt = 0;
          return { targetId: null, progress: 0, complete: false };
        }
        if (nextTargetId !== targetId) {
          targetId = nextTargetId;
          startedAt = time;
        }
        const progress = clamp((time - startedAt) / duration, 0, 1);
        return { targetId, progress, complete: progress >= 1 };
      },
      reset() {
        targetId = null;
        startedAt = 0;
      }
    };
  }

  function createStateMachine(initialState, handlers) {
    let current = initialState;
    return {
      get state() {
        return current;
      },
      transition(nextState, payload) {
        const prev = current;
        if (handlers && handlers.exit && handlers.exit[prev]) handlers.exit[prev](nextState, payload);
        current = nextState;
        if (handlers && handlers.enter && handlers.enter[nextState]) handlers.enter[nextState](prev, payload);
        return current;
      }
    };
  }

  function stopMediaStream(stream) {
    if (!stream) return;
    stream.getTracks().forEach((track) => track.stop());
  }

  function createObjectUrlAsset(file) {
    if (!file) return null;
    const url = URL.createObjectURL(file);
    return { file, url, type: file.type && file.type.startsWith('video/') ? 'video' : 'image' };
  }

  function revokeAssetUrls(assets) {
    (assets || []).forEach((asset) => {
      if (asset && asset.url) URL.revokeObjectURL(asset.url);
    });
  }

  function downloadElementAsPng(canvasOrElement, filename) {
    if (!canvasOrElement || !canvasOrElement.toDataURL) return false;
    const link = document.createElement('a');
    link.download = filename || `zoltan-${Date.now()}.png`;
    link.href = canvasOrElement.toDataURL('image/png');
    link.click();
    return true;
  }

  function formatEventPayload(payload) {
    return Object.assign({
      at: new Date().toISOString(),
      path: location.pathname
    }, payload || {});
  }

  window.ZoltanCore = {
    clamp,
    lerp,
    mapRange,
    safeRandom,
    createDwellTracker,
    createStateMachine,
    downloadElementAsPng,
    stopMediaStream,
    createObjectUrlAsset,
    revokeAssetUrls,
    formatEventPayload
  };
})();
