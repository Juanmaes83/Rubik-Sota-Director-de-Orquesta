/**
 * Rubik preview router — picks the renderer based on the URL.
 *
 * URL conventions (in addition to file-based routes):
 *   /dynamic-motion-banner/<slug>/                  → visual-experience
 *   /dynamic-motion-banner/<slug>/banner-pack/      → banner-pack
 *   /dynamic-motion-banner/<slug>/banner-vertical   → banner-vertical (rewrite)
 *   /dynamic-motion-banner/<slug>/banner-horizontal → banner-horizontal (rewrite)
 *
 * Hint: callers can also pass `view` explicitly to bootRubikPreview().
 *
 * Embed mode: ?embed=1 query parameter strips the QA badge + warnings panel
 * and trims chrome so AURUM can iframe the piece cleanly.
 */

import { getRubikConfigBySlug, listRubikConfigSlugs } from './rubik-config-registry.js';
import { renderVisualExperience } from './renderers/render-visual-experience.js';
import { renderBannerPack } from './renderers/render-banner-pack.js';
import { renderBannerVertical } from './renderers/render-banner-vertical.js';
import { renderBannerHorizontal } from './renderers/render-banner-horizontal.js';

const RENDERERS = {
  'visual-experience': renderVisualExperience,
  'banner-pack': renderBannerPack,
  'banner-vertical': renderBannerVertical,
  'banner-horizontal': renderBannerHorizontal,
};

function detectView(explicit, pathname) {
  if (explicit && RENDERERS[explicit]) return explicit;
  const p = String(pathname || '').toLowerCase();
  if (p.includes('banner-pack')) return 'banner-pack';
  if (p.includes('banner-vertical')) return 'banner-vertical';
  if (p.includes('banner-horizontal')) return 'banner-horizontal';
  return 'visual-experience';
}

function detectEmbed(searchString) {
  const search = new URLSearchParams(searchString || '');
  return search.get('embed') === '1' || search.get('embed') === 'true';
}

function renderMissing(host, slug, embed) {
  host.innerHTML = `
    <div class="rubik-missing">
      <div class="card">
        <div class="eyebrow">Rubik · preview no configurado</div>
        <h1>Slug no registrado</h1>
        <p>No existe configuración Rubik para <code>${slug ? slug.replace(/[<>&"]/g, '') : '(vacío)'}</code>.</p>
        <p style="font-family: var(--rubik-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--rubik-text-mute);">
          Slugs disponibles: ${listRubikConfigSlugs().map((s) => '<code>' + s + '</code>').join(' · ') || '<em>(ninguno)</em>'}
        </p>
      </div>
    </div>
  `;
  if (embed) host.classList.add('rubik-embed');
}

function renderQaPanel(host, config) {
  if (!config.warnings || !config.warnings.length) return;
  const ul = config.warnings
    .map((w) => `<li><strong>${w.code.replace(/[<>&]/g, '')}</strong> — ${String(w.message).replace(/[<>&]/g, '')}</li>`)
    .join('');
  const panel = document.createElement('aside');
  panel.className = 'rubik-qa';
  panel.innerHTML = `<h4>QA · Avisos</h4><ul>${ul}</ul>`;
  host.appendChild(panel);
}

function renderBadge(host, config) {
  const badge = document.createElement('div');
  badge.className = 'rubik-badge';
  badge.textContent = config.previewBadge || 'Rubik preview · Revisable';
  host.appendChild(badge);
}

/**
 * Boot a Rubik preview inside `host`.
 *
 * @param {Object} opts
 * @param {string} [opts.slug]   Override slug detection.
 * @param {string} [opts.view]   Override view (visual-experience|banner-pack|banner-vertical|banner-horizontal).
 * @param {boolean} [opts.embed] Override embed mode.
 * @param {HTMLElement} [opts.host]  Mount target (defaults to #rubik-root or document.body).
 */
export function bootRubikPreview(opts = {}) {
  const host =
    opts.host ||
    document.getElementById('rubik-root') ||
    document.body;

  if (!host) return;

  // Wipe host content (so reuse from inline HTML doesn't leak placeholders).
  host.innerHTML = '';

  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const search = typeof window !== 'undefined' ? window.location.search : '';

  // Slug detection: explicit prop > <body data-rubik-slug> > path segment.
  let slug = opts.slug;
  if (!slug && document.body && document.body.dataset && document.body.dataset.rubikSlug) {
    slug = document.body.dataset.rubikSlug;
  }
  if (!slug) {
    const m = path.match(/\/dynamic-motion-banner\/([^/]+)/i);
    if (m) slug = decodeURIComponent(m[1]);
  }

  const view = detectView(opts.view, path);
  const embed = typeof opts.embed === 'boolean' ? opts.embed : detectEmbed(search);

  // Stage classes.
  host.classList.add('rubik-stage');
  if (embed) host.classList.add('rubik-embed');

  const config = slug ? getRubikConfigBySlug(slug) : null;
  if (!config) {
    renderMissing(host, slug || '', embed);
    return;
  }

  const renderer = RENDERERS[view];
  if (!renderer) {
    renderMissing(host, slug, embed);
    return;
  }

  renderer(config, host, { embed });

  if (!embed) {
    renderBadge(host, config);
    renderQaPanel(host, config);
  }
}

export default bootRubikPreview;
