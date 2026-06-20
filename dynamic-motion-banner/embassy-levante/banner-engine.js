/**
 * Banner Engine — Embassy Levante · Captación de propietarios · Torrevieja
 * Renderiza un canvas 2D con tipografía, imagen, CTA, QR y animaciones.
 */

import embassyLevanteMotionBanner from "./config.js";

const { client, campaign, destination, theme } = embassyLevanteMotionBanner;

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
    img.src = src;
  });
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    const metrics = ctx.measureText(test);
    if (metrics.width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function fitHeadline(ctx, text, maxWidth, maxFontSize) {
  let size = maxFontSize;
  ctx.font = `700 ${size}px Georgia, "Times New Roman", serif`;
  const words = text.split(" ");
  const longest = words.reduce((a, b) => (a.length > b.length ? a : b));
  while (ctx.measureText(longest).width > maxWidth && size > 24) {
    size -= 2;
    ctx.font = `700 ${size}px Georgia, "Times New Roman", serif`;
  }
  const lines = wrapText(ctx, text, maxWidth);
  return { size, lines };
}

class BannerEngine {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.orientation = options.orientation || "vertical";
    this.qrContainer = options.qrContainer || null;
    this.qrGenerated = false;
    this.images = [];
    this.currentImageIndex = 0;
    this.progress = 0;
    this.lastTime = 0;
    this.cycleDuration = 6000;
    this.transitionDuration = 1200;
    this.logo = null;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.resize();
    this.load();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const cssW = rect.width || (this.orientation === "vertical" ? 540 : 960);
    const cssH = rect.height || (this.orientation === "vertical" ? 960 : 540);
    this.width = cssW;
    this.height = cssH;
    this.canvas.width = Math.floor(cssW * this.dpr);
    this.canvas.height = Math.floor(cssH * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  async load() {
    const imageUrls = embassyLevanteMotionBanner.assets.images.map((i) => i.url);
    const fallback = embassyLevanteMotionBanner.assets.fallbackAssets[0]?.url;
    try {
      this.images = await Promise.all(imageUrls.map(loadImage));
    } catch (e) {
      console.warn("Algunas imÃ¡genes no cargaron; usando fallback", e);
      try {
        this.images = [await loadImage(fallback)];
      } catch {
        this.images = [];
      }
    }
    try {
      this.logo = await loadImage(
        embassyLevanteMotionBanner.assets.logo.smartUrl ||
        embassyLevanteMotionBanner.assets.logo.url
      );
    } catch (e) {
      console.warn("Logo no cargÃ³", e);
    }
    this.start();
  }

  start() {
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.frame(t));
  }

  frame(time) {
    if (!this.running) return;
    const dt = time - this.lastTime;
    this.lastTime = time;
    this.progress = (this.progress + dt) % this.cycleDuration;

    const imageCount = Math.max(this.images.length, 1);
    const phaseDuration = this.cycleDuration / imageCount;
    const rawIndex = Math.floor(this.progress / phaseDuration);
    const phaseProgress = (this.progress % phaseDuration) / phaseDuration;
    this.currentImageIndex = rawIndex % imageCount;

    let fadeIn = 1;
    let fadeOut = 0;
    if (phaseProgress < 0.2) {
      fadeIn = phaseProgress / 0.2;
    } else if (phaseProgress > 0.75) {
      fadeOut = (phaseProgress - 0.75) / 0.25;
    }
    this.fadeAlpha = clamp(fadeIn * (1 - fadeOut), 0, 1);

    this.draw(this.fadeAlpha);
    requestAnimationFrame((t) => this.frame(t));
  }

  draw(alpha = 1) {
    const { ctx, width: W, height: H } = this;
    const isVertical = this.orientation === "vertical";
    ctx.clearRect(0, 0, W, H);

    // Fondo imagen
    if (this.images.length) {
      const img = this.images[this.currentImageIndex];
      const scale = Math.max(W / img.width, H / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (W - dw) / 2;
      const dy = (H - dh) / 2;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    } else {
      ctx.fillStyle = theme.background;
      ctx.fillRect(0, 0, W, H);
    }

    // Overlays oscuros â€” vertical mÃ¡s contenido, horizontal mÃ¡s ligero para revelar imagen
    const topOpacity = isVertical ? 0.78 : 0.58;
    const gradTop = ctx.createLinearGradient(0, 0, 0, H * (isVertical ? 0.5 : 0.45));
    gradTop.addColorStop(0, hexToRgba(theme.background, topOpacity));
    gradTop.addColorStop(1, hexToRgba(theme.background, 0));
    ctx.fillStyle = gradTop;
    ctx.fillRect(0, 0, W, H * (isVertical ? 0.5 : 0.45));

    const bottomOpacity = isVertical ? 0.88 : 0.82;
    const gradBottom = ctx.createLinearGradient(0, H * 0.48, 0, H);
    gradBottom.addColorStop(0, hexToRgba(theme.background, 0));
    gradBottom.addColorStop(0.5, hexToRgba(theme.background, isVertical ? 0.52 : 0.44));
    gradBottom.addColorStop(1, hexToRgba(theme.background, bottomOpacity));
    ctx.fillStyle = gradBottom;
    ctx.fillRect(0, H * 0.48, W, H * 0.52);

    // Logo â€” tamaÃ±o reducido con lÃ­mite de ancho para logos horizontales
    if (this.logo) {
      const logoH = isVertical ? H * 0.055 : H * 0.075;
      let logoW = (this.logo.width / this.logo.height) * logoH;
      const maxLogoW = isVertical ? W * 0.32 : W * 0.18;
      if (logoW > maxLogoW) logoW = maxLogoW;
      const lx = isVertical ? W * 0.065 : W * 0.045;
      const ly = isVertical ? H * 0.04 : H * 0.055;
      ctx.drawImage(this.logo, lx, ly, logoW, logoH);
    }

    // Badges
    const badgeY = isVertical ? H * 0.165 : H * 0.185;
    const badgeX = isVertical ? W * 0.065 : W * 0.045;
    const badges = campaign.badges;
    const visibleBadges = isVertical ? badges : badges.slice(0, 4);
    let bx = badgeX;
    visibleBadges.forEach((badge, i) => {
      const delay = i * 0.08;
      const badgeAlpha = clamp((alpha - delay) / 0.4, 0, 1);
      ctx.save();
      ctx.globalAlpha = badgeAlpha;
      ctx.font = `500 ${Math.max(10, isVertical ? W * 0.022 : W * 0.014)}px Inter, sans-serif`;
      const padX = isVertical ? W * 0.022 : W * 0.014;
      const padY = isVertical ? W * 0.012 : W * 0.008;
      const textW = ctx.measureText(badge).width;
      const bw = textW + padX * 2;
      const bh = isVertical ? W * 0.05 : W * 0.032;
      ctx.fillStyle = hexToRgba(theme.gold, 0.16);
      ctx.strokeStyle = hexToRgba(theme.gold, 0.45);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(bx, badgeY, bw, bh, isVertical ? W * 0.01 : W * 0.006);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = theme.amber;
      ctx.textBaseline = "middle";
      ctx.fillText(badge, bx + padX, badgeY + bh / 2);
      ctx.restore();
      bx += bw + (isVertical ? W * 0.02 : W * 0.012);
    });

    // Headline â€” en horizontal subimos para aprovechar mÃ¡s espacio central
    const textX = isVertical ? W * 0.065 : W * 0.045;
    const textY = isVertical ? H * 0.27 : H * 0.28;
    const maxTextW = isVertical ? W * 0.87 : W * 0.5;
    const headlineSize = isVertical ? W * 0.092 : W * 0.058;
    const { size, lines } = fitHeadline(ctx, campaign.headline, maxTextW, headlineSize);
    ctx.save();
    ctx.globalAlpha = clamp((alpha - 0.1) / 0.5, 0, 1);
    ctx.fillStyle = theme.text;
    ctx.textBaseline = "top";
    let cy = textY;
    lines.forEach((line) => {
      ctx.font = `700 ${size}px Georgia, "Times New Roman", serif`;
      ctx.fillText(line, textX, cy);
      cy += size * 0.95;
    });
    ctx.restore();

    // Subheadline
    const subY = cy + (isVertical ? H * 0.028 : H * 0.03);
    const subSize = isVertical ? W * 0.038 : W * 0.024;
    ctx.save();
    ctx.globalAlpha = clamp((alpha - 0.2) / 0.5, 0, 1);
    ctx.fillStyle = theme.muted;
    ctx.font = `400 ${subSize}px Inter, sans-serif`;
    const subLines = wrapText(ctx, campaign.subheadline, maxTextW * 0.95);
    let sy = subY;
    subLines.forEach((line) => {
      ctx.fillText(line, textX, sy);
      sy += subSize * 1.25;
    });
    ctx.restore();

    // CTA
    const ctaW = isVertical ? W * 0.58 : W * 0.24;
    const ctaH = isVertical ? W * 0.12 : W * 0.06;
    const ctaX = isVertical ? textX : W * 0.045;
    const ctaY = isVertical ? H * 0.73 : H * 0.68;
    const ctaSize = isVertical ? W * 0.034 : W * 0.019;
    ctx.save();
    ctx.globalAlpha = clamp((alpha - 0.35) / 0.5, 0, 1);
    ctx.fillStyle = theme.gold;
    ctx.beginPath();
    ctx.roundRect(ctaX, ctaY, ctaW, ctaH, isVertical ? W * 0.02 : W * 0.01);
    ctx.fill();
    ctx.fillStyle = theme.ink;
    ctx.font = `600 ${ctaSize}px Inter, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(campaign.cta, ctaX + ctaW / 2, ctaY + ctaH / 2);
    ctx.restore();

    // QR + label
    const qrSize = isVertical ? W * 0.22 : W * 0.13;
    const qrX = isVertical ? W * 0.695 : W * 0.8;
    const qrY = isVertical ? H * 0.74 : H * 0.52;

    ctx.save();
    ctx.globalAlpha = clamp((alpha - 0.45) / 0.5, 0, 1);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(qrX - W * 0.015, qrY - W * 0.015, qrSize + W * 0.03, qrSize + W * 0.03, W * 0.012);
    ctx.fill();
    ctx.restore();

    this.ensureQR(qrSize);

    // LÃ­nea de apoyo
    ctx.save();
    ctx.globalAlpha = clamp((alpha - 0.5) / 0.5, 0, 1);
    ctx.fillStyle = theme.amber;
    ctx.font = `500 ${isVertical ? W * 0.024 : W * 0.015}px Inter, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    const supportY = isVertical ? H * 0.92 : H * 0.9;
    ctx.fillText(campaign.supportLine, textX, supportY);

    ctx.fillStyle = hexToRgba(theme.muted, 0.8);
    ctx.font = `400 ${isVertical ? W * 0.02 : W * 0.012}px Inter, sans-serif`;
    ctx.fillText(
      embassyLevanteMotionBanner.disclaimers.join(" Â· "),
      textX,
      supportY + (isVertical ? W * 0.038 : W * 0.024)
    );
    ctx.restore();
  }

  ensureQR(size) {
    if (this.qrGenerated || !this.qrContainer) return;
    this.qrGenerated = true;
    this.qrContainer.innerHTML = "";
    const width = Math.round(size);
    new window.QRCode(this.qrContainer, {
      text: destination.qrUrl,
      width,
      height: width,
      colorDark: theme.ink,
      colorLight: "#ffffff",
      correctLevel: window.QRCode.CorrectLevel.M,
    });
  }
}

export { BannerEngine, loadImage };

