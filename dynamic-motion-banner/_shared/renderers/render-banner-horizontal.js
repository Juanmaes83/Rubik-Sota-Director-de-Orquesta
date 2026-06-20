/**
 * renderBannerHorizontal(config, host, { embed })
 *
 * 16:9 horizontal banner — editorial split layout (55% / 45%) at native
 * 1920x1080 resolution, then visually scaled via CSS transform.
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

function attachAutoScaler(viewport, scaler, baseW, baseH) {
  const fit = () => {
    const rect = viewport.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const scale = Math.min(rect.width / baseW, rect.height / baseH);
    scaler.style.transform = `scale(${scale})`;
    scaler.style.width = `${baseW}px`;
    scaler.style.height = `${baseH}px`;
    viewport.style.height = `${baseH * scale}px`;
  };
  fit();
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', fit, { passive: true });
  }
  return fit;
}

/**
 * @param {import('../types.js').RubikClientConfig} config
 * @param {HTMLElement} host
 * @param {{ embed?: boolean }} [opts]
 */
export function renderBannerHorizontal(config, host, opts = {}) {
  if (!config || !host) return;
  const embed = !!opts.embed;
  const fmt = config.bannerPack.horizontal;
  const palette = config.palette;

  host.style.setProperty('--rubik-bg', palette.background);
  host.style.setProperty('--rubik-text', palette.text);
  host.style.setProperty('--rubik-primary', palette.primary);
  host.style.setProperty('--rubik-accent-soft', palette.accentSoft);

  const chipsHtml = (fmt.chips || [])
    .slice(0, 4)
    .map((c) => `<span class="rbh-chip">${escapeHtml(c)}</span>`)
    .join('');

  const phone = fmt.phoneLine;
  const ctaHref = fmt.ctaHref || '#';
  const ctaLabel = fmt.ctaLabel || 'Más información';

  const brand = fmt.brandLine || config.clientName;
  const initials = brandInitials(brand);
  const claim = fmt.claimLine || `${config.zone}`;

  host.innerHTML = `
    <div class="rubik-banner-stage">
      <div class="rubik-banner-viewport" data-banner-viewport>
        <div class="scaler" data-banner-scaler>
          <div class="rubik-banner-frame">
            <section class="rbh" data-rubik-view="banner-horizontal" data-slug="${escapeHtml(config.slug)}">
              <div class="rbh-left">
                <div class="rbh-brand-row">
                  <span class="mark" aria-hidden="true">${escapeHtml(initials)}</span>
                  <span>${escapeHtml(brand)}</span>
                </div>
                <div>
                  <div class="rbh-eyebrow">Pack de banners · 16:9</div>
                  <h2 class="rbh-headline">${escapeHtml(fmt.headline)}</h2>
                  <div class="rbh-claim">${escapeHtml(claim)}</div>
                </div>
                <a class="rbh-cta" href="${escapeHtml(ctaHref)}" target="_blank" rel="noopener">
                  ${escapeHtml(ctaLabel)} <span class="arrow">→</span>
                </a>
              </div>
              <div class="rbh-right">
                <div class="rbh-divider" aria-hidden="true"></div>
                ${chipsHtml ? `<div class="rbh-chips">${chipsHtml}</div>` : ''}
                <div class="rbh-contact-block">
                  ${phone ? `<span class="phone">${escapeHtml(phone)}</span>` : ''}
                  ${fmt.emailLine ? `<span class="label">Email</span><span>${escapeHtml(fmt.emailLine)}</span><br>` : ''}
                  ${fmt.addressLine ? `<span class="label">Oficina</span><span>${escapeHtml(fmt.addressLine)}</span><br>` : ''}
                  ${fmt.scheduleLine ? `<span class="label">Horario</span><span>${escapeHtml(fmt.scheduleLine)}</span>` : ''}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  `;

  const viewport = host.querySelector('[data-banner-viewport]');
  const scaler = host.querySelector('[data-banner-scaler]');
  if (viewport && scaler) attachAutoScaler(viewport, scaler, 1920, 1080);
  if (embed) host.classList.add('rubik-embed');
}

export default renderBannerHorizontal;
