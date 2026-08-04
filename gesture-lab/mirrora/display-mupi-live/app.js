import {
  HandLandmarker,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";

const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

const WRIST = 0;
const THUMB_TIP = 4;
const INDEX_TIP = 8;
const MIDDLE_MCP = 9;
const MAX_LOST_FRAMES = 22;
const RESET_AFTER_MS = 4200;

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
const formatSelect = document.getElementById("format-select");
const landingInput = document.getElementById("landing-input");
const brandLabel = document.getElementById("brand-label");
const kickerLabel = document.getElementById("kicker-label");
const headlineLabel = document.getElementById("headline-label");
const ctaLabel = document.getElementById("cta-label");

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

const portalVideo = document.createElement("canvas");
const portalCtx = portalVideo.getContext("2d");
portalVideo.width = 960;
portalVideo.height = 540;

function status(message) {
  statusEl.textContent = message;
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
  portalCtx.fillText("Scan · Book · Continue", w / 2, h / 2 + 44);
}

function drawPortal(q, time) {
  const expanded = expandQuad(q, 0.22);
  const b = bounds(expanded);
  drawPortalTexture(time);

  ctx.save();
  ctx.globalAlpha = presence * 0.26;
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
  const cover = Math.max(b.width / portalVideo.width, b.height / portalVideo.height);
  const dw = portalVideo.width * cover;
  const dh = portalVideo.height * cover;
  ctx.drawImage(portalVideo, b.x + (b.width - dw) / 2, b.y + (b.height - dh) / 2, dw, dh);
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = presence;
  quadPath(expanded);
  ctx.lineWidth = Math.max(8, canvas.width * 0.006);
  ctx.strokeStyle = "rgba(255, 194, 75, 0.94)";
  ctx.shadowColor = "rgba(255, 107, 94, 0.85)";
  ctx.shadowBlur = Math.max(28, canvas.width * 0.02);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.setLineDash([18, 12]);
  ctx.lineWidth = Math.max(3, canvas.width * 0.002);
  ctx.strokeStyle = "rgba(255,255,255,0.92)";
  ctx.stroke();
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
}

function drawIdle() {
  configureCanvas();
  ctx.fillStyle = "#050507";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawPortalTexture(performance.now());
  ctx.globalAlpha = 0.18;
  ctx.drawImage(portalVideo, 0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
}

function refreshQr() {
  if (!window.QRCode?.toCanvas) return;
  window.QRCode.toCanvas(
    qrCanvas,
    landingInput.value.trim() || "https://example.com/mirrora",
    { margin: 1, width: 240, color: { dark: "#111111", light: "#ffffff" } },
    () => {}
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
  status("Grabando clip de 6 segundos...");
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
    status("Clip descargado. La pantalla vuelve al modo live.");
  };
  recorder.start();
  setTimeout(() => recorder.state === "recording" && recorder.stop(), 6200);
}

btnConsent.addEventListener("click", startCamera);
btnStart.addEventListener("click", startCamera);
btnStop.addEventListener("click", stopCamera);
btnShot.addEventListener("click", capturePng);
btnRecord.addEventListener("click", recordClip);
landingInput.addEventListener("input", refreshQr);
formatSelect.addEventListener("change", () => {
  configureCanvas();
  drawIdle();
});
window.addEventListener("resize", () => {
  configureCanvas();
  drawIdle();
});
window.addEventListener("beforeunload", stopCamera);

refreshQr();
drawIdle();
