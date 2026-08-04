import {
  HandLandmarker,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";

const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
const CONFIG_KEY = "mirrora-display-mupi-live-v11";

const WRIST = 0;
const THUMB_TIP = 4;
const INDEX_TIP = 8;
const MIDDLE_MCP = 9;
const MAX_LOST_FRAMES = 22;
const RESET_AFTER_MS = 4200;

const PRESETS = {
  tourism: {
    brand: "MIRRORA Destination Portal",
    kicker: "MIRRORA Live Display",
    headline: "Tu escapada empieza aqui",
    cta: "Reserva ahora",
    landing: "https://example.com/mirrora",
  },
  retail: {
    brand: "MIRRORA Retail Window",
    kicker: "Oferta interactiva",
    headline: "Descubre la coleccion dentro del marco",
    cta: "Ver catalogo",
    landing: "https://example.com/catalogo",
  },
  event: {
    brand: "MIRRORA Event Portal",
    kicker: "Experiencia en directo",
    headline: "Llevate tu recuerdo al movil",
    cta: "Participa ahora",
    landing: "https://example.com/evento",
  },
  museum: {
    brand: "MIRRORA Culture Window",
    kicker: "Ruta inmersiva",
    headline: "Abre la pieza y continua la visita",
    cta: "Explorar ruta",
    landing: "https://example.com/ruta",
  },
};

const video = document.getElementById("camera");
const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const qrCanvas = document.getElementById("qr");
const attract = document.getElementById("attract");
const statusEl = document.getElementById("status");
const consent = document.getElementById("consent");
const btnConsent = document.getElementById("btn-consent");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const btnShot = document.getElementById("btn-shot");
const btnRecord = document.getElementById("btn-record");
const btnConfig = document.getElementById("btn-config");
const btnCloseConfig = document.getElementById("btn-close-config");
const btnAutoFit = document.getElementById("btn-auto-fit");
const btnResetPortal = document.getElementById("btn-reset-portal");
const btnClearAssets = document.getElementById("btn-clear-assets");
const configPanel = document.getElementById("config-panel");
const formatSelect = document.getElementById("format-select");
const presetSelect = document.getElementById("preset-select");
const landingInput = document.getElementById("landing-input");
const brandInput = document.getElementById("brand-input");
const kickerInput = document.getElementById("kicker-input");
const headlineInput = document.getElementById("headline-input");
const ctaInput = document.getElementById("cta-input");
const portalFile = document.getElementById("portal-file");
const logoFile = document.getElementById("logo-file");
const brandLabel = document.getElementById("brand-label");
const kickerLabel = document.getElementById("kicker-label");
const headlineLabel = document.getElementById("headline-label");
const ctaLabel = document.getElementById("cta-label");

const rangeInputs = [
  ["frameExpand", document.getElementById("frame-expand"), document.getElementById("frame-expand-value"), "%"],
  ["portalScale", document.getElementById("portal-scale"), document.getElementById("portal-scale-value"), "%"],
  ["portalOffsetX", document.getElementById("portal-offset-x"), document.getElementById("portal-offset-x-value"), ""],
  ["portalOffsetY", document.getElementById("portal-offset-y"), document.getElementById("portal-offset-y-value"), ""],
  ["portalGlow", document.getElementById("portal-glow"), document.getElementById("portal-glow-value"), "%"],
  ["outsideDim", document.getElementById("outside-dim"), document.getElementById("outside-dim-value"), "%"],
];

let landmarker = null;
let stream = null;
let rafId = null;
let corners = null;
let presence = 0;
let lostFrames = 0;
let lastGestureAt = 0;
let lastVideoTime = -1;
let sourceDraw = { x: 0, y: 0, width: 1, height: 1 };
let recording = false;
let portalUrl = "";
let portalMedia = null;
let portalKind = "demo";
let logoUrl = "";
let logoImage = null;

const portalVideo = document.createElement("canvas");
const portalCtx = portalVideo.getContext("2d");
portalVideo.width = 960;
portalVideo.height = 540;

function status(message) {
  statusEl.textContent = message;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function textValue(input, fallback) {
  return (input.value || "").trim() || fallback;
}

function getSettings() {
  return {
    format: formatSelect.value === "vertical" ? "vertical" : "landscape",
    preset: presetSelect.value,
    brand: textValue(brandInput, PRESETS.tourism.brand),
    kicker: textValue(kickerInput, PRESETS.tourism.kicker),
    headline: textValue(headlineInput, PRESETS.tourism.headline),
    cta: textValue(ctaInput, PRESETS.tourism.cta),
    landing: textValue(landingInput, PRESETS.tourism.landing),
    frameExpand: Number(document.getElementById("frame-expand").value) / 100,
    portalScale: Number(document.getElementById("portal-scale").value) / 100,
    portalOffsetX: Number(document.getElementById("portal-offset-x").value) / 100,
    portalOffsetY: Number(document.getElementById("portal-offset-y").value) / 100,
    portalGlow: Number(document.getElementById("portal-glow").value) / 100,
    outsideDim: Number(document.getElementById("outside-dim").value) / 100,
  };
}

function persistSettings() {
  const settings = getSettings();
  localStorage.setItem(CONFIG_KEY, JSON.stringify(settings));
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return;
    const settings = JSON.parse(raw);
    formatSelect.value = settings.format || "landscape";
    presetSelect.value = settings.preset || "tourism";
    brandInput.value = settings.brand || PRESETS.tourism.brand;
    kickerInput.value = settings.kicker || PRESETS.tourism.kicker;
    headlineInput.value = settings.headline || PRESETS.tourism.headline;
    ctaInput.value = settings.cta || PRESETS.tourism.cta;
    landingInput.value = settings.landing || PRESETS.tourism.landing;
    setRange("frameExpand", Math.round((settings.frameExpand ?? 0.22) * 100));
    setRange("portalScale", Math.round((settings.portalScale ?? 1.15) * 100));
    setRange("portalOffsetX", Math.round((settings.portalOffsetX ?? 0) * 100));
    setRange("portalOffsetY", Math.round((settings.portalOffsetY ?? 0) * 100));
    setRange("portalGlow", Math.round((settings.portalGlow ?? 0.65) * 100));
    setRange("outsideDim", Math.round((settings.outsideDim ?? 0.22) * 100));
  } catch (error) {
    console.warn("No se pudo leer la configuracion local", error);
  }
}

function setRange(name, value) {
  const row = rangeInputs.find(([key]) => key === name);
  if (!row) return;
  const [, input] = row;
  input.value = String(clamp(value, Number(input.min), Number(input.max)));
}

function updateRangeLabels() {
  for (const [, input, label, suffix] of rangeInputs) {
    label.textContent = `${input.value}${suffix}`;
  }
}

function applySettings({ persist = true, redraw = true } = {}) {
  const settings = getSettings();
  document.body.dataset.format = settings.format;
  brandLabel.textContent = settings.brand;
  kickerLabel.textContent = settings.kicker;
  headlineLabel.textContent = settings.headline;
  ctaLabel.textContent = settings.cta;
  updateRangeLabels();
  refreshQr();
  configureCanvas();
  if (persist) persistSettings();
  if (redraw && !stream) drawIdle();
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function lerpPt(a, b, t) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function polygonArea(pts) {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const q = pts[(i + 1) % pts.length];
    area += p.x * q.y - q.x * p.y;
  }
  return Math.abs(area / 2);
}

function configureCanvas() {
  const landscape = formatSelect.value === "landscape";
  document.body.dataset.format = landscape ? "landscape" : "vertical";
  canvas.width = landscape ? 1920 : 1080;
  canvas.height = landscape ? 1080 : 1920;
  const vw = video.videoWidth || 1280;
  const vh = video.videoHeight || 720;
  const scale = Math.max(canvas.width / vw, canvas.height / vh);
  const width = vw * scale;
  const height = vh * scale;
  sourceDraw = {
    x: (canvas.width - width) / 2,
    y: (canvas.height - height) / 2,
    width,
    height,
  };
}

function toPixel(lm) {
  return {
    x: sourceDraw.x + (1 - lm.x) * sourceDraw.width,
    y: sourceDraw.y + lm.y * sourceDraw.height,
  };
}

function computeQuad(hands) {
  if (hands.length !== 2) return null;
  const info = hands.map((lm) => ({
    index: toPixel(lm[INDEX_TIP]),
    thumb: toPixel(lm[THUMB_TIP]),
    wristX: toPixel(lm[WRIST]).x,
    scale: dist(toPixel(lm[WRIST]), toPixel(lm[MIDDLE_MCP])) + 1,
  }));
  for (const hand of info) {
    if (dist(hand.thumb, hand.index) < hand.scale * 0.62) return null;
  }
  info.sort((a, b) => a.wristX - b.wristX);
  const [left, right] = info;
  const pts = [left.index, right.index, right.thumb, left.thumb];
  if (polygonArea(pts) < canvas.width * canvas.height * 0.0025) return null;
  return pts;
}

function updateTracker(hands) {
  const target = computeQuad(hands);
  if (target) {
    lastGestureAt = performance.now();
    attract.classList.add("hidden");
    lostFrames = 0;
    if (!corners) {
      corners = target;
      presence = 0.25;
    } else {
      corners = corners.map((c, i) => lerpPt(c, target[i], 0.45));
      presence = Math.min(1, presence + 0.1);
    }
  } else if (corners && lostFrames++ < MAX_LOST_FRAMES) {
    presence = Math.max(0.2, presence - 0.015);
  } else {
    presence = Math.max(0, presence - 0.045);
    if (presence <= 0.01) corners = null;
  }

  if (!corners && performance.now() - lastGestureAt > RESET_AFTER_MS) {
    attract.classList.remove("hidden");
  }
}

function quadPath(q) {
  ctx.beginPath();
  ctx.moveTo(q[0].x, q[0].y);
  for (let i = 1; i < q.length; i++) ctx.lineTo(q[i].x, q[i].y);
  ctx.closePath();
}

function expandQuad(q, amount = 0.18) {
  const cx = q.reduce((sum, p) => sum + p.x, 0) / q.length;
  const cy = q.reduce((sum, p) => sum + p.y, 0) / q.length;
  return q.map((p) => ({
    x: cx + (p.x - cx) * (1 + amount),
    y: cy + (p.y - cy) * (1 + amount),
  }));
}

function bounds(q) {
  const xs = q.map((p) => p.x);
  const ys = q.map((p) => p.y);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, width: Math.max(...xs) - x, height: Math.max(...ys) - y };
}

function drawRoundRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function fitText(text, maxWidth, initialPx, minPx) {
  let size = initialPx;
  ctx.font = `950 ${size}px system-ui, sans-serif`;
  while (size > minPx && ctx.measureText(text).width > maxWidth) {
    size -= 2;
    ctx.font = `950 ${size}px system-ui, sans-serif`;
  }
  return size;
}

function drawCover(media, x, y, width, height, scale = 1, offsetX = 0, offsetY = 0) {
  const mw = media.videoWidth || media.naturalWidth || media.width || 1;
  const mh = media.videoHeight || media.naturalHeight || media.height || 1;
  const cover = Math.max(width / mw, height / mh) * scale;
  const dw = mw * cover;
  const dh = mh * cover;
  const dx = x + (width - dw) / 2 + offsetX * width;
  const dy = y + (height - dh) / 2 + offsetY * height;
  ctx.drawImage(media, dx, dy, dw, dh);
}

function drawCamera() {
  ctx.save();
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (video.readyState >= 2) {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, canvas.width - sourceDraw.x - sourceDraw.width, sourceDraw.y, sourceDraw.width, sourceDraw.height);
  }
  ctx.restore();
}

function drawPortalTexture(time) {
  const w = portalVideo.width;
  const h = portalVideo.height;
  const grad = portalCtx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#ff6b5e");
  grad.addColorStop(0.42, "#ffc24b");
  grad.addColorStop(1, "#28d7ff");
  portalCtx.fillStyle = grad;
  portalCtx.fillRect(0, 0, w, h);
  portalCtx.save();
  portalCtx.globalAlpha = 0.35;
  for (let i = 0; i < 9; i++) {
    const x = (Math.sin(time * 0.001 + i) * 0.5 + 0.5) * w;
    const y = (Math.cos(time * 0.0014 + i * 1.7) * 0.5 + 0.5) * h;
    portalCtx.beginPath();
    portalCtx.arc(x, y, 80 + i * 12, 0, Math.PI * 2);
    portalCtx.fillStyle = i % 2 ? "#ffffff" : "#090909";
    portalCtx.fill();
  }
  portalCtx.restore();
  portalCtx.fillStyle = "rgba(0,0,0,0.32)";
  portalCtx.fillRect(0, 0, w, h);
  portalCtx.fillStyle = "#fff";
  portalCtx.font = "900 58px system-ui, sans-serif";
  portalCtx.textAlign = "center";
  portalCtx.fillText("DESTINATION PORTAL", w / 2, h / 2 - 10);
  portalCtx.font = "800 30px system-ui, sans-serif";
  portalCtx.fillStyle = "rgba(255,255,255,0.78)";
  portalCtx.fillText("Scan - Book - Continue", w / 2, h / 2 + 44);
}

function hasReadyPortalMedia() {
  if (!portalMedia) return false;
  if (portalKind === "video") return portalMedia.readyState >= 2;
  return portalMedia.complete !== false;
}

function drawPortal(q, time) {
  const settings = getSettings();
  const expanded = expandQuad(q, settings.frameExpand);
  const b = bounds(expanded);
  drawPortalTexture(time);

  ctx.save();
  ctx.globalAlpha = presence * settings.outsideDim;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.moveTo(expanded[0].x, expanded[0].y);
  for (let i = expanded.length - 1; i >= 0; i--) ctx.lineTo(expanded[i].x, expanded[i].y);
  ctx.closePath();
  ctx.fill("evenodd");
  ctx.restore();

  ctx.save();
  quadPath(expanded);
  ctx.clip();
  ctx.globalAlpha = presence;
  const media = hasReadyPortalMedia() ? portalMedia : portalVideo;
  drawCover(media, b.x, b.y, b.width, b.height, settings.portalScale, settings.portalOffsetX, settings.portalOffsetY);
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = presence;
  quadPath(expanded);
  ctx.lineWidth = Math.max(8, canvas.width * 0.006);
  ctx.strokeStyle = "rgba(255, 194, 75, 0.94)";
  ctx.shadowColor = "rgba(255, 107, 94, 0.85)";
  ctx.shadowBlur = Math.max(10, canvas.width * 0.028 * settings.portalGlow);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.setLineDash([18, 12]);
  ctx.lineWidth = Math.max(3, canvas.width * 0.002);
  ctx.strokeStyle = "rgba(255,255,255,0.92)";
  ctx.stroke();
  ctx.restore();
}

function drawCanvasOverlay() {
  const settings = getSettings();
  const pad = canvas.width * 0.032;
  const top = canvas.height * 0.035;
  const qrSize = clamp(canvas.width * 0.112, 122, 210);
  const logoSize = clamp(canvas.width * 0.05, 54, 90);

  ctx.save();
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(0,0,0,0.48)";
  drawRoundRect(pad, top, Math.min(canvas.width * 0.42, 620), logoSize + 24, (logoSize + 24) / 2);
  ctx.fill();
  ctx.fillStyle = "#ffc24b";
  ctx.beginPath();
  ctx.arc(pad + 28, top + logoSize / 2 + 12, 9, 0, Math.PI * 2);
  ctx.fill();
  if (logoImage?.complete) {
    ctx.save();
    drawRoundRect(pad + 48, top + 12, logoSize, logoSize, 12);
    ctx.clip();
    drawCover(logoImage, pad + 48, top + 12, logoSize, logoSize, 1, 0, 0);
    ctx.restore();
  }
  ctx.fillStyle = "#fff";
  const brandX = logoImage?.complete ? pad + logoSize + 68 : pad + 52;
  ctx.font = `900 ${clamp(canvas.width * 0.018, 18, 30)}px system-ui, sans-serif`;
  ctx.fillText(settings.brand, brandX, top + logoSize / 2 + 12);

  ctx.fillStyle = "rgba(255,255,255,0.96)";
  const qrX = canvas.width - pad - qrSize;
  drawRoundRect(qrX - 12, top, qrSize + 24, qrSize + 48, 18);
  ctx.fill();
  ctx.drawImage(qrCanvas, qrX, top + 12, qrSize, qrSize);
  ctx.fillStyle = "#18130d";
  ctx.textAlign = "center";
  ctx.font = `900 ${clamp(canvas.width * 0.009, 10, 14)}px system-ui, sans-serif`;
  ctx.fillText("Escanea y continua", qrX + qrSize / 2, top + qrSize + 34);

  const panelH = clamp(canvas.height * 0.145, 150, 230);
  const panelX = pad;
  const panelY = canvas.height - pad - panelH;
  const panelW = canvas.width - pad * 2;
  ctx.fillStyle = "rgba(0,0,0,0.62)";
  drawRoundRect(panelX, panelY, panelW, panelH, 26);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255,255,255,0.66)";
  ctx.font = `900 ${clamp(canvas.width * 0.013, 13, 22)}px system-ui, sans-serif`;
  ctx.fillText(settings.kicker.toUpperCase(), panelX + 34, panelY + panelH * 0.34);
  const headlineSize = fitText(settings.headline, panelW * 0.62, clamp(canvas.width * 0.036, 34, 66), 24);
  ctx.fillStyle = "#fff";
  ctx.font = `950 ${headlineSize}px system-ui, sans-serif`;
  ctx.fillText(settings.headline, panelX + 34, panelY + panelH * 0.68);

  const ctaFontSize = clamp(canvas.width * 0.016, 18, 28);
  ctx.font = `950 ${ctaFontSize}px system-ui, sans-serif`;
  const ctaW = clamp(ctx.measureText(settings.cta).width + 74, 210, panelW * 0.34);
  const ctaH = clamp(panelH * 0.34, 54, 74);
  const ctaX = panelX + panelW - ctaW - 32;
  const ctaY = panelY + (panelH - ctaH) / 2;
  const grad = ctx.createLinearGradient(ctaX, ctaY, ctaX + ctaW, ctaY);
  grad.addColorStop(0, "#ff6b5e");
  grad.addColorStop(1, "#ffc24b");
  ctx.fillStyle = grad;
  drawRoundRect(ctaX, ctaY, ctaW, ctaH, ctaH / 2);
  ctx.fill();
  ctx.fillStyle = "#1b1208";
  ctx.textAlign = "center";
  ctx.font = `950 ${ctaFontSize}px system-ui, sans-serif`;
  ctx.fillText(settings.cta, ctaX + ctaW / 2, ctaY + ctaH / 2);
  ctx.restore();
}

async function initLandmarker() {
  if (landmarker) return;
  status("Cargando detector de manos...");
  const fileset = await FilesetResolver.forVisionTasks(WASM_URL);
  landmarker = await HandLandmarker.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
    runningMode: "VIDEO",
    numHands: 2,
    minHandDetectionConfidence: 0.32,
    minHandPresenceConfidence: 0.32,
    minTrackingConfidence: 0.32,
  });
}

async function startCamera() {
  try {
    await initLandmarker();
    status("Solicitando camara...");
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });
    video.srcObject = stream;
    await video.play();
    configureCanvas();
    btnStart.disabled = true;
    btnStop.disabled = false;
    btnShot.disabled = false;
    btnRecord.disabled = false;
    consent.classList.add("hidden");
    lastGestureAt = performance.now() - RESET_AFTER_MS - 1;
    status("Camara activa. Haz el marco con tus manos.");
    renderLoop();
  } catch (error) {
    console.error(error);
    status("No se pudo activar la camara. Usa HTTPS/GitHub Pages, localhost o revisa permisos.");
  }
}

function stopCamera() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  if (stream) stream.getTracks().forEach((track) => track.stop());
  stream = null;
  video.srcObject = null;
  btnStart.disabled = false;
  btnStop.disabled = true;
  btnShot.disabled = true;
  btnRecord.disabled = true;
  corners = null;
  presence = 0;
  attract.classList.remove("hidden");
  drawIdle();
  status("Camara detenida.");
}

function renderLoop(time = performance.now()) {
  rafId = requestAnimationFrame(renderLoop);
  drawCamera();
  if (landmarker && video.readyState >= 2 && video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    const res = landmarker.detectForVideo(video, time);
    updateTracker(res.landmarks || []);
  }
  if (corners && presence > 0.01) drawPortal(corners, time);
  drawCanvasOverlay();
}

function drawIdle() {
  configureCanvas();
  ctx.fillStyle = "#050507";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawPortalTexture(performance.now());
  ctx.globalAlpha = 0.18;
  ctx.drawImage(portalVideo, 0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
  drawCanvasOverlay();
}

function refreshQr() {
  if (!window.QRCode?.toCanvas) return;
  window.QRCode.toCanvas(
    qrCanvas,
    landingInput.value.trim() || PRESETS.tourism.landing,
    { margin: 1, width: 240, color: { dark: "#111111", light: "#ffffff" } },
    () => {
      if (!stream) drawIdle();
    }
  );
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function capturePng() {
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, "mirrora-display-mupi-live.png");
  }, "image/png");
}

function recordClip() {
  if (recording) return;
  recording = true;
  btnRecord.disabled = true;
  status("Grabando clip comercial de 6 segundos...");
  const streamOut = canvas.captureStream(30);
  const mime = ["video/mp4", "video/webm;codecs=vp9", "video/webm"].find((m) => MediaRecorder.isTypeSupported(m)) || "video/webm";
  const chunks = [];
  const recorder = new MediaRecorder(streamOut, { mimeType: mime, videoBitsPerSecond: 8_000_000 });
  recorder.ondataavailable = (event) => event.data.size && chunks.push(event.data);
  recorder.onstop = () => {
    streamOut.getTracks().forEach((track) => track.stop());
    const ext = mime.startsWith("video/mp4") ? "mp4" : "webm";
    downloadBlob(new Blob(chunks, { type: mime }), `mirrora-display-mupi-live.${ext}`);
    recording = false;
    btnRecord.disabled = false;
    status("Clip descargado con portal, marca, QR y CTA.");
  };
  recorder.start();
  setTimeout(() => recorder.state === "recording" && recorder.stop(), 6200);
}

function revokeAssetUrls() {
  if (portalUrl) URL.revokeObjectURL(portalUrl);
  if (logoUrl) URL.revokeObjectURL(logoUrl);
  portalUrl = "";
  logoUrl = "";
}

function loadPortalFile(file) {
  if (!file) return;
  if (portalUrl) URL.revokeObjectURL(portalUrl);
  portalUrl = URL.createObjectURL(file);
  if (file.type.startsWith("video/")) {
    const media = document.createElement("video");
    media.src = portalUrl;
    media.loop = true;
    media.muted = true;
    media.playsInline = true;
    media.addEventListener("loadeddata", () => {
      media.play().catch(() => {});
      status("Contenido de portal cargado. Haz el marco para verlo en directo.");
    }, { once: true });
    portalMedia = media;
    portalKind = "video";
  } else {
    const img = new Image();
    img.onload = () => status("Imagen de portal cargada. Haz el marco para verla en directo.");
    img.src = portalUrl;
    portalMedia = img;
    portalKind = "image";
  }
  drawIdle();
}

function loadLogoFile(file) {
  if (!file) return;
  if (logoUrl) URL.revokeObjectURL(logoUrl);
  logoUrl = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    logoImage = img;
    drawIdle();
    status("Logo cargado en la composicion comercial.");
  };
  img.src = logoUrl;
}

function applyPreset(name) {
  const preset = PRESETS[name] || PRESETS.tourism;
  brandInput.value = preset.brand;
  kickerInput.value = preset.kicker;
  headlineInput.value = preset.headline;
  ctaInput.value = preset.cta;
  landingInput.value = preset.landing;
  applySettings();
}

btnConsent.addEventListener("click", startCamera);
btnStart.addEventListener("click", startCamera);
btnStop.addEventListener("click", stopCamera);
btnShot.addEventListener("click", capturePng);
btnRecord.addEventListener("click", recordClip);
btnConfig.addEventListener("click", () => {
  configPanel.hidden = !configPanel.hidden;
});
btnCloseConfig.addEventListener("click", () => {
  configPanel.hidden = true;
});
btnAutoFit.addEventListener("click", () => {
  setRange("frameExpand", 26);
  setRange("portalScale", 112);
  setRange("portalOffsetX", 0);
  setRange("portalOffsetY", 0);
  applySettings();
  status("Portal auto encajado para evitar recortes agresivos.");
});
btnResetPortal.addEventListener("click", () => {
  setRange("frameExpand", 22);
  setRange("portalScale", 115);
  setRange("portalOffsetX", 0);
  setRange("portalOffsetY", 0);
  setRange("portalGlow", 65);
  setRange("outsideDim", 22);
  applySettings();
  status("Controles del portal restaurados.");
});
btnClearAssets.addEventListener("click", () => {
  revokeAssetUrls();
  portalMedia = null;
  portalKind = "demo";
  logoImage = null;
  portalFile.value = "";
  logoFile.value = "";
  drawIdle();
  status("Assets quitados. Se muestra el arte demo local.");
});
portalFile.addEventListener("change", (event) => loadPortalFile(event.target.files?.[0]));
logoFile.addEventListener("change", (event) => loadLogoFile(event.target.files?.[0]));
presetSelect.addEventListener("change", () => applyPreset(presetSelect.value));
for (const [, input] of rangeInputs) {
  input.addEventListener("input", () => applySettings());
}
for (const input of [brandInput, kickerInput, headlineInput, ctaInput, landingInput]) {
  input.addEventListener("input", () => applySettings());
}
formatSelect.addEventListener("change", () => applySettings());
window.addEventListener("resize", () => {
  configureCanvas();
  if (!stream) drawIdle();
});
window.addEventListener("beforeunload", () => {
  stopCamera();
  revokeAssetUrls();
});

loadSettings();
applySettings({ persist: false });
drawIdle();
