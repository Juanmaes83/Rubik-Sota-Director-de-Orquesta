(function () {
  function createController(options) {
    const opts = options || {};
    const core = window.ZoltanCore || {};
    let stream = null;
    let running = false;
    let lastFrame = null;
    let raf = 0;
    const canvas = document.createElement('canvas');
    canvas.width = 160;
    canvas.height = 110;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    function emitStatus(status, detail) {
      if (opts.onStatus) opts.onStatus(status, detail || {});
    }

    function emitGesture(data) {
      if (opts.onGesture) opts.onGesture(Object.assign({
        source: 'motion',
        gesture: 'None',
        x: 0.5,
        y: 0.5,
        confidence: 0,
        handedness: 'Unknown',
        timestamp: performance.now()
      }, data || {}));
    }

    function analyze() {
      if (!running) return;
      raf = requestAnimationFrame(analyze);
      const video = opts.videoEl;
      if (!video || !video.videoWidth || !video.videoHeight) {
        emitStatus('searching-camera');
        return;
      }
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
      ctx.restore();
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      if (!lastFrame) {
        lastFrame = frame;
        return;
      }

      let left = 0;
      let center = 0;
      let right = 0;
      let total = 0;
      const data = frame.data;
      const prev = lastFrame.data;
      for (let y = 0; y < canvas.height; y += 3) {
        for (let x = 0; x < canvas.width; x += 3) {
          const i = (y * canvas.width + x) * 4;
          const diff = Math.abs(data[i] - prev[i]) + Math.abs(data[i + 1] - prev[i + 1]) + Math.abs(data[i + 2] - prev[i + 2]);
          if (diff < 42) continue;
          total += diff;
          if (x < canvas.width / 3) left += diff;
          else if (x < (canvas.width / 3) * 2) center += diff;
          else right += diff;
        }
      }
      lastFrame = frame;
      if (total < 20000) {
        emitStatus('searching-hand');
        return;
      }
      const max = Math.max(left, center, right);
      const zone = max === left ? 0 : max === center ? 1 : 2;
      const x = zone === 0 ? 0.18 : zone === 1 ? 0.5 : 0.82;
      const gesture = total > 90000 ? 'Open_Palm' : 'Pointing';
      emitStatus('tracking');
      emitGesture({
        source: 'motion',
        gesture,
        x,
        y: 0.5,
        confidence: Math.min(0.96, total / 130000),
        handedness: zone === 0 ? 'Left' : zone === 2 ? 'Right' : 'Unknown'
      });
    }

    async function start() {
      if (running) return true;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        emitStatus('camera-unavailable');
        return false;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false
        });
        if (opts.videoEl) {
          opts.videoEl.srcObject = stream;
          await opts.videoEl.play();
        }
        running = true;
        lastFrame = null;
        emitStatus('camera-started');
        if (window.ZoltanAnalytics) window.ZoltanAnalytics.track('camera_started', { mode: opts.mode || 'auto' });
        analyze();
        return true;
      } catch (err) {
        emitStatus('camera-denied', { message: err.message });
        if (window.ZoltanAnalytics) window.ZoltanAnalytics.track('camera_denied', { message: err.message });
        return false;
      }
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
      if (core.stopMediaStream) core.stopMediaStream(stream);
      stream = null;
      if (opts.videoEl) opts.videoEl.srcObject = null;
      emitStatus('camera-stopped');
    }

    function handlePointer(event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const payload = {
        source: event.pointerType === 'touch' ? 'touch' : 'mouse',
        gesture: 'Pointing',
        x,
        y,
        confidence: 1,
        handedness: 'Unknown',
        timestamp: performance.now()
      };
      if (opts.onPointer) opts.onPointer(payload);
      if (window.ZoltanAnalytics) window.ZoltanAnalytics.track('fallback_used', { source: payload.source });
      return payload;
    }

    return { start, stop, handlePointer, emitGesture };
  }

  window.ZoltanGestures = { createController };
})();
