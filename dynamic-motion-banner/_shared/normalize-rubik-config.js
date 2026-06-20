/**
 * normalizeRubikConfig — turns the raw AURUM-style four-hook specs
 * (visualExperienceSpec, bannerPackSpec, rubikConfigSeed) into a single
 * `RubikClientConfig` consumable by Rubik renderers.
 *
 * Rules (anti-hallucination):
 *  - Missing logo / hero image / hero video → assets keep `null` and a
 *    structured warning is pushed. Renderers fall back to abstract CSS.
 *  - Missing claim → reuse seed.claim or compose `${clientName} — ${zone}`.
 *  - Missing contact channel → warning; never invent numbers.
 *  - Forbidden tokens (`Internal draft`, `lorem`, `planned`, `pending`)
 *    are filtered out of any user-facing copy.
 *
 * @typedef {import('./types.js')} _types
 */

const FORBIDDEN_TOKENS = [
  'Internal draft',
  'internal draft',
  'INTERNAL DRAFT',
  'lorem',
  'Lorem',
  'placeholder_replace_before_publish',
];

const STATUS_WORDS_LOWER = ['planned', 'pending', 'pending_validation', 'candidate'];

const DEFAULT_PALETTE = Object.freeze({
  background: '#080604',
  text: '#f5f0e8',
  primary: '#c4a96a',
  accentSoft: 'rgba(196, 169, 106, 0.16)',
  surface: 'rgba(255, 255, 255, 0.06)',
  serifFamily: '"Cormorant Garamond", "Playfair Display", Georgia, "Times New Roman", serif',
  sansFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
  monoFamily: '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace',
});

/**
 * @param {string|null|undefined} value
 * @returns {string|null}
 */
function safeCopy(value) {
  if (typeof value !== 'string') return null;
  let out = value.trim();
  if (!out) return null;
  for (const token of FORBIDDEN_TOKENS) {
    if (out.includes(token)) {
      out = out.split(token).join('').replace(/\s+/g, ' ').trim();
    }
  }
  // Drop sentences that are pure status words (case-insensitive).
  const lower = out.toLowerCase();
  if (STATUS_WORDS_LOWER.includes(lower)) return null;
  return out || null;
}

/**
 * @param {{ primary?: string|null, background?: string|null, text?: string|null }|null|undefined} seedPalette
 * @returns {import('./types.js').RubikMotionTheme}
 */
function buildPalette(seedPalette) {
  const primary = seedPalette && typeof seedPalette.primary === 'string' && seedPalette.primary.trim()
    ? seedPalette.primary.trim()
    : DEFAULT_PALETTE.primary;
  const background = seedPalette && typeof seedPalette.background === 'string' && seedPalette.background.trim()
    ? seedPalette.background.trim()
    : DEFAULT_PALETTE.background;
  const text = seedPalette && typeof seedPalette.text === 'string' && seedPalette.text.trim()
    ? seedPalette.text.trim()
    : DEFAULT_PALETTE.text;

  // Soft accent derived from primary if it's a 6-digit hex.
  let accentSoft = DEFAULT_PALETTE.accentSoft;
  const hex = primary.startsWith('#') ? primary.slice(1) : primary;
  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    accentSoft = `rgba(${r}, ${g}, ${b}, 0.18)`;
  }

  return {
    background,
    text,
    primary,
    accentSoft,
    surface: DEFAULT_PALETTE.surface,
    serifFamily: DEFAULT_PALETTE.serifFamily,
    sansFamily: DEFAULT_PALETTE.sansFamily,
    monoFamily: DEFAULT_PALETTE.monoFamily,
  };
}

/**
 * @param {*} cta
 * @param {string} fallbackLabel
 * @returns {import('./types.js').RubikCTAConfig}
 */
function buildCTA(cta, fallbackLabel) {
  if (cta && typeof cta === 'object') {
    const label = safeCopy(cta.label) || fallbackLabel;
    const href = typeof cta.href === 'string' && cta.href.trim() ? cta.href.trim() : '#';
    const channel = typeof cta.channel === 'string' ? cta.channel : 'custom';
    return { label, href, channel };
  }
  return { label: fallbackLabel, href: '#', channel: 'custom' };
}

/**
 * @param {*} spec
 * @returns {import('./types.js').RubikContactConfig}
 */
function buildContact(spec) {
  const src = (spec && spec.contact) || {};
  return {
    phone: safeCopy(src.phone),
    whatsapp: safeCopy(src.whatsapp),
    email: safeCopy(src.email),
    address: safeCopy(src.address),
    schedule: safeCopy(src.schedule),
    website: safeCopy(src.website),
  };
}

/**
 * @param {*} spec
 * @returns {{ assets: import('./types.js').RubikAssetConfig, warnings: import('./types.js').RubikPreviewWarning[] }}
 */
function buildAssets(spec) {
  const seed = (spec && spec.rubikConfigSeed) || {};
  /** @type {import('./types.js').RubikPreviewWarning[]} */
  const warnings = [];

  const logo = typeof seed.logo === 'string' && seed.logo.trim() ? seed.logo.trim() : null;
  const heroImage = typeof seed.heroImage === 'string' && seed.heroImage.trim() ? seed.heroImage.trim() : null;
  // Hero video is rarely on the seed; check explicit field on visualExperienceSpec if any.
  const heroVideo = spec && typeof spec.heroVideo === 'string' && spec.heroVideo.trim()
    ? spec.heroVideo.trim()
    : null;

  if (!logo) warnings.push({ code: 'missing_logo', message: 'Logo no aprobado. Pieza renderiza sin marca gráfica.' });
  if (!heroImage) warnings.push({ code: 'missing_hero_image', message: 'Imagen hero no aprobada. Render usa composición editorial CSS.' });
  if (!heroVideo) warnings.push({ code: 'missing_hero_video', message: 'Video hero no aprobado. Render usa composición editorial CSS.' });

  if (!logo && !heroImage && !heroVideo) {
    warnings.push({
      code: 'missing_assets_all',
      message: 'Sin assets visuales aprobados — composición 100% editorial CSS.',
    });
  }

  return {
    assets: { logo, heroImage, heroVideo, gallery: [] },
    warnings,
  };
}

/**
 * @param {*} ve
 * @param {string} clientName
 * @param {string} zone
 * @param {string} fallbackClaim
 * @returns {import('./types.js').RubikVisualExperienceConfig}
 */
function buildVisualExperience(ve, clientName, zone, fallbackClaim) {
  const first = (ve && ve.firstImpression) || {};
  const headline = safeCopy(first.headline) || fallbackClaim;
  const subheadline = safeCopy(first.subheadline) || `${clientName} · ${zone}`;
  const journeyBlocks = Array.isArray(ve && ve.journeyBlocks)
    ? ve.journeyBlocks
        .map((b) => ({
          moment: typeof b.moment === 'number' ? b.moment : 0,
          title: safeCopy(b.title) || '',
          description: safeCopy(b.description) || '',
          visualCue: safeCopy(b.visualCue) || '',
        }))
        .filter((b) => b.title && b.description)
    : [];

  // Guarantee at least 3 journey blocks for editorial composition.
  while (journeyBlocks.length < 3) {
    const idx = journeyBlocks.length + 1;
    journeyBlocks.push({
      moment: idx,
      title: ['Primera mirada', 'El entorno', 'Contacto directo'][idx - 1] || `Bloque ${idx}`,
      description: [
        `${clientName} en ${zone} se presenta con una sola imagen editorial.`,
        `${zone} como contexto de vida: luz, espacio, cercanía al servicio.`,
        `Respuesta humana directa por WhatsApp, llamada o visita en oficina.`,
      ][idx - 1] || `${clientName} en ${zone}.`,
      visualCue: 'Composición editorial CSS premium.',
    });
  }

  return {
    hookName: safeCopy(ve && ve.hookName) || 'Experiencia Visual',
    narrative: safeCopy(ve && ve.narrative) || `${clientName} en ${zone}.`,
    headline,
    subheadline,
    journeyBlocks,
    cta: buildCTA(ve && ve.CTA, 'Solicitar información'),
    embedUrl: ve && ve.rubikEmbedUrl ? String(ve.rubikEmbedUrl) : null,
    publicUrl: ve && ve.routes && ve.routes.primary ? String(ve.routes.primary) : null,
  };
}

/**
 * @param {*} bv
 * @param {string} fallbackHeadline
 * @param {string} fallbackCtaLabel
 * @param {string} fallbackCtaHref
 * @param {string|null} fallbackPhone
 * @param {string|null} fallbackEmail
 * @returns {import('./types.js').RubikBannerFormatConfig}
 */
function buildVerticalFormat(bv, fallbackHeadline, fallbackCtaLabel, fallbackCtaHref, fallbackPhone, fallbackEmail) {
  const src = bv || {};
  const contact = (src.contact && typeof src.contact === 'object') ? src.contact : {};
  const chips = Array.isArray(src.chips) ? src.chips.map(safeCopy).filter(Boolean) : [];
  return {
    id: 'vertical',
    ratio: '9:16',
    dimensions: '1080 × 1920',
    useCases: ['Instagram Stories', 'Reels', 'TikTok', 'WhatsApp Status'],
    headline: safeCopy(src.headline) || fallbackHeadline,
    subline: safeCopy(src.subline) || '',
    chips: chips.length ? chips : ['Compra', 'Venta', 'Asesoramiento'],
    ctaLabel: safeCopy(contact.cta) || fallbackCtaLabel,
    ctaHref: fallbackCtaHref,
    brandLine: null,
    claimLine: null,
    addressLine: safeCopy(src.address) || null,
    scheduleLine: safeCopy(src.schedule) || null,
    phoneLine: safeCopy(contact.phone) || fallbackPhone,
    emailLine: safeCopy(contact.email) || fallbackEmail,
    compositionNote: safeCopy(src.format) || 'Composición vertical 9:16: marca + headline + chips + contacto.',
  };
}

/**
 * @param {*} bh
 * @param {string} fallbackHeadline
 * @param {string} fallbackCtaLabel
 * @param {string} fallbackCtaHref
 * @param {string|null} fallbackPhone
 * @param {string|null} fallbackEmail
 * @returns {import('./types.js').RubikBannerFormatConfig}
 */
function buildHorizontalFormat(bh, fallbackHeadline, fallbackCtaLabel, fallbackCtaHref, fallbackPhone, fallbackEmail) {
  const src = bh || {};
  const left = (src.leftColumn && typeof src.leftColumn === 'object') ? src.leftColumn : {};
  const right = (src.rightColumn && typeof src.rightColumn === 'object') ? src.rightColumn : {};
  const rcContact = (right.contact && typeof right.contact === 'object') ? right.contact : {};
  const chips = Array.isArray(right.chips) ? right.chips.map(safeCopy).filter(Boolean) : [];
  return {
    id: 'horizontal',
    ratio: '16:9',
    dimensions: '1920 × 1080',
    useCases: ['YouTube ads', 'Google Display', 'Presentaciones', 'LinkedIn'],
    headline: safeCopy(left.headline) || safeCopy(src.headline) || fallbackHeadline,
    subline: safeCopy(src.subline) || '',
    chips: chips.length ? chips : ['Compra', 'Venta', 'Asesoramiento'],
    ctaLabel: safeCopy(right.cta) || fallbackCtaLabel,
    ctaHref: fallbackCtaHref,
    brandLine: safeCopy(left.brand) || null,
    claimLine: safeCopy(left.claim) || null,
    addressLine: safeCopy(rcContact.address) || null,
    scheduleLine: safeCopy(right.schedule) || null,
    phoneLine: safeCopy(rcContact.phone) || fallbackPhone,
    emailLine: safeCopy(rcContact.email) || fallbackEmail,
    compositionNote: safeCopy(src.format) || 'Composición horizontal 16:9: bloque visual + columna copy + CTA.',
  };
}

/**
 * @param {*} bp
 * @param {string} fallbackHeadline
 * @param {import('./types.js').RubikContactConfig} contact
 * @returns {import('./types.js').RubikBannerPackConfig}
 */
function buildBannerPack(bp, fallbackHeadline, contact) {
  const claims = Array.isArray(bp && bp.claims)
    ? bp.claims.map(safeCopy).filter(Boolean)
    : [];
  if (!claims.length) claims.push(fallbackHeadline);

  const packCta = buildCTA(bp && bp.CTA, contact.website || 'Más información');
  const vCopy = bp && bp.formatSpecificCopy && bp.formatSpecificCopy.vertical;
  const hCopy = bp && bp.formatSpecificCopy && bp.formatSpecificCopy.horizontal;
  const fallbackCtaHref = packCta.href;

  const vertical = buildVerticalFormat(
    vCopy,
    fallbackHeadline,
    packCta.label,
    fallbackCtaHref,
    contact.phone,
    contact.email,
  );
  const horizontal = buildHorizontalFormat(
    hCopy,
    fallbackHeadline,
    packCta.label,
    fallbackCtaHref,
    contact.phone,
    contact.email,
  );

  return {
    hookName: safeCopy(bp && bp.hookName) || 'Pack de Banners',
    claims,
    vertical,
    horizontal,
    cta: packCta,
    contact,
    visualDirection:
      safeCopy(bp && bp.visualDirection) ||
      'Composición CSS editorial. Fondo oscuro, acento dorado, serif para headline, mono para etiquetas.',
  };
}

/**
 * @param {string} slug
 * @returns {import('./types.js').RubikRouteConfig}
 */
function buildRoutes(slug) {
  const base = `/dynamic-motion-banner/${slug}`;
  return {
    visualExperience: `${base}/`,
    bannerPack: `${base}/banner-pack/`,
    bannerVertical: `${base}/banner-vertical.html`,
    bannerHorizontal: `${base}/banner-horizontal.html`,
    embedSuffix: '?embed=1',
    aurumVisualExperience: null,
    aurumBannerPack: null,
  };
}

/**
 * Normalize raw four-hook specs into a single Rubik render config.
 *
 * @param {{ visualExperienceSpec: any, bannerPackSpec: any, rubikConfigSeed: any }} input
 * @returns {import('./types.js').RubikClientConfig}
 */
export function normalizeRubikConfig(input) {
  if (!input || typeof input !== 'object') {
    throw new Error('normalizeRubikConfig: input must be an object');
  }
  const { visualExperienceSpec, bannerPackSpec, rubikConfigSeed } = input;
  if (!rubikConfigSeed || typeof rubikConfigSeed !== 'object') {
    throw new Error('normalizeRubikConfig: rubikConfigSeed is required');
  }

  const slug = String(rubikConfigSeed.slug || '').trim();
  if (!slug) throw new Error('normalizeRubikConfig: rubikConfigSeed.slug is required');

  const clientName = safeCopy(rubikConfigSeed.clientName) || slug;
  const zone = safeCopy(rubikConfigSeed.zone) || '';
  const sector = safeCopy(rubikConfigSeed.sector) || 'Inmobiliaria';
  const fallbackClaim =
    safeCopy(rubikConfigSeed.claim) ||
    (zone ? `${clientName} — ${zone}` : clientName);

  const palette = buildPalette(rubikConfigSeed.palette);
  const contact = buildContact(visualExperienceSpec || bannerPackSpec || {});
  const { assets, warnings } = buildAssets(visualExperienceSpec || {});

  const visualExperience = buildVisualExperience(visualExperienceSpec, clientName, zone, fallbackClaim);
  const bannerPack = buildBannerPack(bannerPackSpec, visualExperience.headline, contact);

  // CTA at config root: prefer visualExperience.cta but tag channel correctly.
  const cta = visualExperience.cta;

  // Routes — paths inside Rubik. AURUM URLs are optional and added by callers.
  const routes = buildRoutes(slug);
  if (visualExperienceSpec && visualExperienceSpec.routes && visualExperienceSpec.routes.primary) {
    routes.aurumVisualExperience = String(visualExperienceSpec.routes.primary);
  }
  if (bannerPackSpec && bannerPackSpec.routes && bannerPackSpec.routes.pack) {
    routes.aurumBannerPack = String(bannerPackSpec.routes.pack);
  }

  // Final warning: missing claim already covered by fallback so we don't push it twice.
  if (!safeCopy(rubikConfigSeed.claim)) {
    warnings.push({
      code: 'missing_claim',
      message: 'Claim no provisto — usando combinación cliente + zona.',
    });
  }

  // Contact-channel warnings (controlled, never inventing).
  if (!contact.phone && !contact.whatsapp) {
    warnings.push({ code: 'missing_contact', message: 'Sin teléfono/WhatsApp validado.' });
  }

  return {
    slug,
    clientName,
    zone,
    sector,
    claim: fallbackClaim,
    subclaim: visualExperience.subheadline,
    palette,
    cta,
    contact,
    assets,
    visualExperience,
    bannerPack,
    routes,
    warnings,
    previewBadge: 'Rubik preview · Revisable',
  };
}

export const __test_internals__ = {
  safeCopy,
  buildPalette,
  FORBIDDEN_TOKENS,
};
