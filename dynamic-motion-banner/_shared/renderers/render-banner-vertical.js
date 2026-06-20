/**
 * renderBannerVertical(config, host, { embed })
 *
 * 9:16 vertical banner. Pixel-honest 1080x1920 layout scaled to viewport via
 * CSS transform so it looks correct on phone/desktop without warping the
 * composition that designers/exporters will see at native resolution.
 */

const escapeHtml = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

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
export function renderBannerVertical(config, host, opts = {}) {
  if (!config || !host) return;
  const embed = !!opts.embed;
  const fmt = config.bannerPack.vertical;
  const palette = config.palette;

  host.style.setProperty('--rubik-bg', palette.background);
  host.style.setProperty('--rubik-text', palette.text);
  host.style.setProperty('--rubik-primary', palette.primary);
  host.style.setProperty('--rubik-accent-soft', palette.accentSoft);

  const chipsHtml = (fmt.chips || [])
    .slice(0, 4)
    .map((c) => `<span class="rbv-chip">${escapeHtml(c)}</span>`)
    .join('');

  const phone = fmt.phoneLine;
  const phoneHref = phone ? `tel:${phone.replace(/\s+/g, '')}` : null;
  const ctaHref = fmt.ctaHref || '#';
  const ctaLabel = fmt.ctaLabel || 'Solicitar visita';

  host.innerHTML = `
    <div class="rubik-banner-stage">
      <div class="rubik-banner-viewport" data-banner-viewport>
        <div class="scaler" data-banner-scaler>
          <div class="rubik-banner-frame">
            <section class="rbv" data-rubik-view="banner-vertical" data-slug="${escapeHtml(config.slug)}">
              <header class="rbv-top">
                <div class="brand">
                  <span>${escapeHtml(config.clientName)}</span>
                  <span class="zone">${escapeHtml(config.zone)}</span>
                </div>
                <div class="ratio">9:16</div>
              </header>

              <div class="rbv-center">
                <div class="rbv-eyebrow">Pack de banners</div>
                <h2 class="rbv-headline">${escapeHtml(fmt.headline)}</h2>
                ${fmt.subline ? `<p class="rbv-subline">${escapeHtml(fmt.subline)}</p>` : ''}
                ${chipsHtml ? `<div class="rbv-chips">${chipsHtml}</div>` : ''}
              </div>

              <footer class="rbv-bottom">
                <div class="rbv-contact">
                  ${phone ? `<span class="phone"><a href="${escapeHtml(phoneHref)}" style="color:inherit;text-decoration:none;">${escapeHtml(phone)}</a></span>` : ''}
                  ${fmt.emailLine ? `<span>${escapeHtml(fmt.emailLine)}</span>` : ''}
                  ${fmt.addressLine ? `<br><span>${escapeHtml(fmt.addressLine)}</span>` : ''}
                </div>
                <a class="rbv-cta" href="${escapeHtml(ctaHref)}" target="_blank" rel="noopener">
                  ${escapeHtml(ctaLabel)} <span class="arrow">→</span>
                </a>
              </footer>
            </section>
          </div>
        </div>
      </div>
    </div>
  `;

  const viewport = host.querySelector('[data-banner-viewport]');
  const scaler = host.querySelector('[data-banner-scaler]');
  if (viewport && scaler) attachAutoScaler(viewport, scaler, 1080, 1920);
  if (embed) host.classList.add('rubik-embed');
}

export default renderBannerVertical;
