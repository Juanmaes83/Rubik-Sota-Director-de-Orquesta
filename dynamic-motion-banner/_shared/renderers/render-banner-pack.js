/**
 * renderBannerPack(config, host, { embed })
 *
 * Pack overview: claims, both formats embedded via iframe pointing at the
 * standalone banner HTMLs in embed mode, plus quick links.
 */

const escapeHtml = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/**
 * @param {import('../types.js').RubikClientConfig} config
 * @param {HTMLElement} host
 * @param {{ embed?: boolean }} [opts]
 */
export function renderBannerPack(config, host, opts = {}) {
  if (!config || !host) return;
  const pack = config.bannerPack;
  const palette = config.palette;
  const routes = config.routes;
  const embed = !!opts.embed;

  host.style.setProperty('--rubik-bg', palette.background);
  host.style.setProperty('--rubik-text', palette.text);
  host.style.setProperty('--rubik-primary', palette.primary);
  host.style.setProperty('--rubik-accent-soft', palette.accentSoft);

  const verticalUrl = `${routes.bannerVertical}?embed=1`;
  const horizontalUrl = `${routes.bannerHorizontal}?embed=1`;

  const claimsHtml = (pack.claims || [])
    .slice(0, 4)
    .map((c) => `<li>${escapeHtml(c)}</li>`)
    .join('');

  host.innerHTML = `
    <main class="rbp" data-rubik-view="banner-pack" data-slug="${escapeHtml(config.slug)}">
      <header class="rbp-head">
        <div style="font-family: var(--rubik-mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--rubik-primary);">
          ${escapeHtml(config.clientName)} · ${escapeHtml(config.zone)}
        </div>
        <h1>${escapeHtml(pack.hookName)} <em>· Pack</em></h1>
        <p>${escapeHtml(pack.visualDirection)}</p>
        ${claimsHtml ? `<ul class="rbp-claims">${claimsHtml}</ul>` : ''}
      </header>

      <section class="rbp-grid">
        <article class="rbp-card">
          <h2>Formato Vertical</h2>
          <div class="meta">${escapeHtml(pack.vertical.ratio)} · ${escapeHtml(pack.vertical.dimensions)} · ${(pack.vertical.useCases || []).slice(0, 3).map(escapeHtml).join(' · ')}</div>
          <div class="frame vertical">
            <iframe src="${escapeHtml(verticalUrl)}" title="Banner vertical ${escapeHtml(config.clientName)}" loading="lazy"></iframe>
          </div>
          <div class="actions">
            <a href="${escapeHtml(routes.bannerVertical)}" target="_blank" rel="noopener">Abrir vertical</a>
            <a href="${escapeHtml(routes.bannerVertical)}?embed=1" target="_blank" rel="noopener">Modo embed</a>
          </div>
        </article>

        <article class="rbp-card">
          <h2>Formato Horizontal</h2>
          <div class="meta">${escapeHtml(pack.horizontal.ratio)} · ${escapeHtml(pack.horizontal.dimensions)} · ${(pack.horizontal.useCases || []).slice(0, 3).map(escapeHtml).join(' · ')}</div>
          <div class="frame horizontal">
            <iframe src="${escapeHtml(horizontalUrl)}" title="Banner horizontal ${escapeHtml(config.clientName)}" loading="lazy"></iframe>
          </div>
          <div class="actions">
            <a href="${escapeHtml(routes.bannerHorizontal)}" target="_blank" rel="noopener">Abrir horizontal</a>
            <a href="${escapeHtml(routes.bannerHorizontal)}?embed=1" target="_blank" rel="noopener">Modo embed</a>
          </div>
        </article>
      </section>

      <footer style="border-top: 1px solid var(--rubik-line); padding-top: 22px; font-family: var(--rubik-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--rubik-text-mute);">
        ${escapeHtml(pack.cta.label)} · <a href="${escapeHtml(pack.cta.href)}" target="_blank" rel="noopener" style="color: var(--rubik-primary); text-decoration: none;">${escapeHtml(pack.cta.href)}</a>
      </footer>
    </main>
  `;

  if (embed) host.classList.add('rubik-embed');
}

export default renderBannerPack;
