(function () {
  'use strict';

  const DEFAULT_PRIVACY_MESSAGE = 'La cámara se usa solo para detectar gestos en este dispositivo. No se graba vídeo ni se envían imágenes.';

  function now() {
    return typeof performance !== 'undefined' ? performance.now() : Date.now();
  }

  function shallowClone(obj) {
    return Object.assign({}, obj);
  }

  const state = {
    cameraSupported: !!(typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    cameraActive: false,
    permissionState: 'prompt',
    activeInputMode: 'touch',
    lastGesture: null,
    confidence: 0,
    error: null
  };

  const listeners = [];
  let controller = null;
  let options = {};
  let keyboardHandler = null;
  let pointerHandlers = [];

  function emit(event, detail) {
    const payload = shallowClone(detail || {});
    payload.event = event;
    payload.at = now();
    listeners.forEach((cb) => {
      try { cb(event, payload); } catch (err) { /* no-op */ }
    });
    if (typeof options.onEvent === 'function') {
      try { options.onEvent(event, payload); } catch (err) { /* no-op */ }
    }
  }

  function updateState(patch) {
    Object.assign(state, patch);
  }

  function handleKeyDown(e) {
    const mode = options.mode;
    if (mode === 'yesno') {
      if (e.key === 'y' || e.key === 'Y' || e.key === 'ArrowRight') {
        updateState({ activeInputMode: 'keyboard', lastGesture: null });
        emit('YES', { source: 'keyboard' });
        emit('FALLBACK_USED', { source: 'keyboard' });
      } else if (e.key === 'n' || e.key === 'N' || e.key === 'ArrowLeft') {
        updateState({ activeInputMode: 'keyboard', lastGesture: null });
        emit('NO', { source: 'keyboard' });
        emit('FALLBACK_USED', { source: 'keyboard' });
      }
    } else if (mode === 'zones3') {
      if (e.key === '1' || e.key === 'ArrowLeft') {
        updateState({ activeInputMode: 'keyboard', lastGesture: null });
        emit('ZONE_0', { source: 'keyboard' });
        emit('FALLBACK_USED', { source: 'keyboard' });
      } else if (e.key === '2' || e.key === 'ArrowUp' || e.key === ' ') {
        updateState({ activeInputMode: 'keyboard', lastGesture: null });
        emit('ZONE_1', { source: 'keyboard' });
        emit('FALLBACK_USED', { source: 'keyboard' });
      } else if (e.key === '3' || e.key === 'ArrowRight') {
        updateState({ activeInputMode: 'keyboard', lastGesture: null });
        emit('ZONE_2', { source: 'keyboard' });
        emit('FALLBACK_USED', { source: 'keyboard' });
      }
    }
  }

  function attachPointer(el) {
    const down = (e) => {
      const rect = el.getBoundingClientRect();
      const x = rect.width > 0 ? (e.clientX - rect.left) / rect.width : 0.5;
      const y = rect.height > 0 ? (e.clientY - rect.top) / rect.height : 0.5;
      const source = e.pointerType === 'touch' ? 'touch' : 'mouse';
      updateState({
        activeInputMode: 'touch',
        lastGesture: {
          source,
          gesture: 'Pointing',
          x,
          y,
          confidence: 1,
          handedness: 'Unknown',
          timestamp: now()
        }
      });
      emit('FALLBACK_USED', { source });
      if (options.mode === 'yesno') {
        emit(x >= 0.5 ? 'YES' : 'NO', { source, x, y });
      } else if (options.mode === 'zones3') {
        const zone = x < 0.34 ? 0 : x < 0.66 ? 1 : 2;
        emit(`ZONE_${zone}`, { source, x, y });
      } else {
        emit('POINTER', { source, x, y, originalEvent: e });
      }
    };
    el.addEventListener('pointerdown', down);
    pointerHandlers.push({ el, down });
  }

  function init(opts) {
    destroy();
    options = Object.assign({
      videoEl: null,
      stageEl: null,
      enableKeyboard: true,
      enablePointer: true,
      mode: 'raw',
      privacyMessage: DEFAULT_PRIVACY_MESSAGE,
      gestureCooldownMs: 1100,
      minConfidence: 0.28,
      yesThreshold: 0.6,
      noThreshold: 0.4
    }, opts || {});

    updateState({
      cameraSupported: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
      cameraActive: false,
      permissionState: 'prompt',
      activeInputMode: 'touch',
      lastGesture: null,
      confidence: 0,
      error: null
    });

    if (options.enableKeyboard && !keyboardHandler) {
      keyboardHandler = handleKeyDown;
      document.addEventListener('keydown', keyboardHandler);
    }

    if (options.enablePointer && options.stageEl) {
      attachPointer(options.stageEl);
    }
  }

  async function startCamera() {
    if (!state.cameraSupported) {
      updateState({
        permissionState: 'unsupported',
        error: 'Cámara no soportada en este navegador.',
        activeInputMode: 'touch'
      });
      emit('CAMERA_ERROR', { error: state.error, status: 'unsupported' });
      emit('FALLBACK_USED', { source: 'camera-unsupported' });
      return false;
    }

    if (controller) {
      controller.stop();
      controller = null;
    }

    let lastGestureAt = 0;

    controller = window.ZoltanGestures.createController({
      videoEl: options.videoEl,
      onStatus(status, detail) {
        if (status === 'camera-started') {
          updateState({
            cameraActive: true,
            permissionState: 'granted',
            activeInputMode: 'webcam',
            error: null
          });
          emit('CAMERA_READY', shallowClone(detail));
        } else if (status === 'camera-denied') {
          updateState({
            cameraActive: false,
            permissionState: 'denied',
            error: detail && detail.message ? detail.message : 'Permiso de cámara denegado.',
            activeInputMode: 'touch'
          });
          emit('CAMERA_ERROR', { error: state.error, status });
          emit('FALLBACK_USED', { source: 'camera-denied' });
        } else if (status === 'camera-unavailable') {
          updateState({
            cameraActive: false,
            permissionState: 'unsupported',
            error: detail && detail.message ? detail.message : 'Cámara no disponible.',
            activeInputMode: 'touch'
          });
          emit('CAMERA_ERROR', { error: state.error, status });
          emit('FALLBACK_USED', { source: 'camera-unavailable' });
        } else if (status === 'camera-stopped') {
          updateState({ cameraActive: false });
          if (state.activeInputMode === 'webcam') {
            updateState({ activeInputMode: 'touch' });
          }
        }
      },
      onGesture(gesture) {
        updateState({
          lastGesture: shallowClone(gesture),
          confidence: gesture.confidence || 0
        });

        if (options.mode === 'raw') {
          emit('GESTURE', shallowClone(gesture));
          return;
        }

        const confidence = gesture.confidence || 0;
        if (confidence < options.minConfidence) return;

        const t = now();
        if (t - lastGestureAt < options.gestureCooldownMs) return;
        lastGestureAt = t;

        if (options.mode === 'yesno') {
          if (gesture.x > options.yesThreshold) {
            emit('YES', { source: 'webcam', gesture: shallowClone(gesture) });
          } else if (gesture.x < options.noThreshold) {
            emit('NO', { source: 'webcam', gesture: shallowClone(gesture) });
          } else {
            emit('NEUTRAL', { source: 'webcam', gesture: shallowClone(gesture) });
          }
        } else if (options.mode === 'zones3') {
          const zone = gesture.x < 0.34 ? 0 : gesture.x < 0.66 ? 1 : 2;
          emit(`ZONE_${zone}`, { source: 'webcam', gesture: shallowClone(gesture) });
        }
      },
      onPointer(payload) {
        updateState({
          activeInputMode: 'touch',
          lastGesture: shallowClone(payload)
        });
        emit('FALLBACK_USED', { source: payload.source });
      }
    });

    emit('PRIVACY_ACK', { message: options.privacyMessage });

    const ok = await controller.start();
    if (!ok) {
      updateState({ cameraActive: false, activeInputMode: 'touch' });
    }
    return ok;
  }

  function stopCamera() {
    if (controller) {
      controller.stop();
      controller = null;
    }
    updateState({ cameraActive: false });
    if (state.activeInputMode === 'webcam') {
      updateState({ activeInputMode: 'touch' });
    }
  }

  function onGesture(callback) {
    if (typeof callback === 'function') listeners.push(callback);
  }

  function emitChoice(choice, detail) {
    const extra = Object.assign({ source: 'api' }, detail || {});
    updateState({ activeInputMode: 'touch', lastGesture: null });
    if (choice === true || choice === 'YES') {
      emit('YES', extra);
    } else if (choice === false || choice === 'NO') {
      emit('NO', extra);
    } else if (choice === 'NEUTRAL' || choice === null || choice === undefined) {
      emit('NEUTRAL', extra);
    } else {
      emit('CHOICE', Object.assign(extra, { choice }));
    }
  }

  function getState() {
    return shallowClone(state);
  }

  function destroy() {
    stopCamera();
    if (keyboardHandler) {
      document.removeEventListener('keydown', keyboardHandler);
      keyboardHandler = null;
    }
    pointerHandlers.forEach((entry) => {
      if (entry.el && entry.down) entry.el.removeEventListener('pointerdown', entry.down);
    });
    pointerHandlers = [];
    listeners.length = 0;
    options = {};
  }

  window.ZoltanGestureRuntime = {
    init,
    startCamera,
    stopCamera,
    onGesture,
    emitChoice,
    getState,
    destroy
  };
})();
