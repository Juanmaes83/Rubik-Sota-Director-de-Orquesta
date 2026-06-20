/**
 * renderVisualExperience(config, host, { embed })
 *
 * Renders a premium editorial visual experience inside `host`.
 * Pure DOM, no React. Honors `prefers-reduced-motion` via global CSS.
 */

const escapeHtml = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const brandInitials = (clientName) =>
  String(clientName || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || 'R';

/**
 * @param {import('../types.js').RubikClientConfig} config
 * @param {HTMLElement} host
 * @param {{ embed?: boolean }} [opts]
 */
export function renderVisualExperience(config, host, opts = {}) {
  if (!config || !host) return;
  const embed = !!opts.embed;
  const ve = config.visualExperience;
  const palette = config.palette;
  const contact = config.contact;

  // Inject palette as CSS custom properties on host scope.
  host.style.setProperty('--rubik-bg', palette.background);
  host.style.setProperty('--rubik-text', palette.text);
  host.style.setProperty('--rubik-primary', palette.primary);
  host.style.setProperty('--rubik-accent-soft', palette.accentSoft);

  const initials = brandInitials(config.clientName);
  const hasHeroVideo = !!config.assets.heroVideo;
  const hasHeroImage = !!config.assets.heroImage;

  const ctaHref = ve.cta.href || '#';
  const ctaLabel = ve.cta.label || 'Solicitar información';

  const phone = contact.phone;
  const phoneHref = phone ? `tel:${phone.replace(/\s+/g, '')}` : null;
  const wa = contact.whatsapp;

  const journeyHtml = ve.journeyBlocks
    .map(
      (b, i) => `
      <article class="rve-block">
        <div class="moment">Momento ${b.moment || i + 1}</div>
        <h3>${escapeHtml(b.title)}</h3>
        <p>${escapeHtml(b.description)}</p>
      </article>`,
    )
    .join('');

  const visualInnerHtml = hasHeroVideo
    ? `<video autoplay muted playsinline loop preload="metadata" src="${escapeHtml(config.assets.heroVideo)}"></video>`
    : hasHeroImage
      ? `<img src="${escapeHtml(config.assets.heroImage)}" alt="${escapeHtml(config.clientName)} · ${escapeHtml(config.zone)}">`
      : '';

  const visualCaption = ve.journeyBlocks[0] && ve.journeyBlocks[0].visualCue
    ? `<div class="rve-visual-caption">${escapeHtml(ve.journeyBlocks[0].visualCue)}</div>`
    : '';

  const rightTop = embed
    ? ''
    : `<div class="right">${escapeHtml(config.sector)} · ${escapeHtml(config.zone)}</div>`;

  host.innerHTML = `
    <main class="rve" data-rubik-view="visual-experience" data-slug="${escapeHtml(config.slug)}">
      <header class="rve-top">
        <div class="brand">
          <span class="brand-mark" aria-hidden="true">${escapeHtml(initials)}</span>
          <span>${escapeHtml(config.clientName)} · ${escapeHtml(config.zone)}</span>
        </div>
        ${rightTop}
      </header>

      <section class="rve-hero">
        <div>
          <div class="rve-eyebrow">${escapeHtml(ve.hookName)}</div>
          <h1 class="rve-headline">${escapeHtml(ve.headline)}</h1>
          <p class="rve-sub">${escapeHtml(ve.subheadline)}</p>
        </div>
        <div class="rve-visual" role="img" aria-label="${escapeHtml(config.clientName)} ${escapeHtml(config.zone)} — composición editorial">
          ${visualInnerHtml}
          ${visualCaption}
        </div>
      </section>

      <section class="rve-journey" aria-label="Recorrido visual">
        ${journeyHtml}
      </section>

      <footer class="rve-cta-row">
        <a class="rve-cta" href="${escapeHtml(ctaHref)}" target="_blank" rel="noopener">
          ${escapeHtml(ctaLabel)} <span class="arrow">→</span>
        </a>
        <div class="rve-contact">
          ${phone && phoneHref ? `<a href="${escapeHtml(phoneHref)}">${escapeHtml(phone)}</a>` : ''}
          ${wa ? `<span> · </span><a href="${escapeHtml(wa)}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
        </div>
      </footer>
    </main>
  `;
}

export default renderVisualExperience;
