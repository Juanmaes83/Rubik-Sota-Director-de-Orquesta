/**
 * Rubik Preview Config — type definitions (JSDoc).
 *
 * Rubik is a static site (no React/TS build). We document the shape of
 * `RubikClientConfig` and friends in JSDoc so renderers can reason about
 * the data without runtime type-checking overhead.
 *
 * These types intentionally mirror the AURUM fourHookSpecs surface
 * (visualExperienceSpec, bannerPackSpec, rubikConfigSeed) so that the
 * normalizer can map AURUM specs to a single Rubik config shape.
 */

/**
 * @typedef {Object} RubikCTAConfig
 * @property {string} label
 * @property {string} href
 * @property {('whatsapp'|'phone'|'email'|'website'|'custom')} channel
 */

/**
 * @typedef {Object} RubikContactConfig
 * @property {string|null} phone
 * @property {string|null} whatsapp
 * @property {string|null} email
 * @property {string|null} address
 * @property {string|null} schedule
 * @property {string|null} website
 */

/**
 * @typedef {Object} RubikAssetConfig
 * @property {string|null} logo       Absolute URL or null if unapproved.
 * @property {string|null} heroImage  Absolute URL or null if unapproved.
 * @property {string|null} heroVideo  Absolute URL or null if unapproved.
 * @property {string[]} gallery       Absolute URLs (may be empty).
 */

/**
 * @typedef {Object} RubikMotionTheme
 * @property {string} background      Base background color (hex).
 * @property {string} text            Base text color (hex).
 * @property {string} primary         Brand accent color (hex).
 * @property {string} accentSoft      Secondary accent (rgba allowed).
 * @property {string} surface         Surface card color (rgba allowed).
 * @property {string} serifFamily     Serif font stack for editorial display.
 * @property {string} sansFamily      Sans font stack for body.
 * @property {string} monoFamily      Mono font stack for eyebrows / tags.
 */

/**
 * @typedef {Object} RubikJourneyBlock
 * @property {number} moment
 * @property {string} title
 * @property {string} description
 * @property {string} visualCue
 */

/**
 * @typedef {Object} RubikVisualExperienceConfig
 * @property {string} hookName
 * @property {string} narrative
 * @property {string} headline
 * @property {string} subheadline
 * @property {RubikJourneyBlock[]} journeyBlocks
 * @property {RubikCTAConfig} cta
 * @property {string|null} embedUrl
 * @property {string|null} publicUrl
 */

/**
 * @typedef {Object} RubikBannerFormatConfig
 * @property {('vertical'|'horizontal')} id
 * @property {string} ratio
 * @property {string} dimensions
 * @property {string[]} useCases
 * @property {string} headline
 * @property {string} subline
 * @property {string[]} chips
 * @property {string} ctaLabel
 * @property {string} ctaHref
 * @property {string|null} brandLine
 * @property {string|null} claimLine
 * @property {string|null} addressLine
 * @property {string|null} scheduleLine
 * @property {string|null} phoneLine
 * @property {string|null} emailLine
 * @property {string} compositionNote
 */

/**
 * @typedef {Object} RubikBannerPackConfig
 * @property {string} hookName
 * @property {string[]} claims
 * @property {RubikBannerFormatConfig} vertical
 * @property {RubikBannerFormatConfig} horizontal
 * @property {RubikCTAConfig} cta
 * @property {RubikContactConfig} contact
 * @property {string} visualDirection
 */

/**
 * @typedef {Object} RubikPreviewWarning
 * @property {('missing_logo'|'missing_hero_image'|'missing_hero_video'|'missing_contact'|'missing_claim'|'missing_assets_all')} code
 * @property {string} message
 */

/**
 * @typedef {Object} RubikRouteConfig
 * @property {string} visualExperience   Rubik path (root for the client).
 * @property {string} bannerPack         Rubik path (banner pack overview).
 * @property {string} bannerVertical     Rubik path (vertical render).
 * @property {string} bannerHorizontal   Rubik path (horizontal render).
 * @property {string} embedSuffix        Query string for embed mode.
 * @property {string|null} aurumVisualExperience  AURUM public URL.
 * @property {string|null} aurumBannerPack        AURUM public URL.
 */

/**
 * @typedef {Object} RubikClientConfig
 * @property {string} slug
 * @property {string} clientName
 * @property {string} zone
 * @property {string} sector
 * @property {string} claim
 * @property {string} subclaim
 * @property {RubikMotionTheme} palette
 * @property {RubikCTAConfig} cta
 * @property {RubikContactConfig} contact
 * @property {RubikAssetConfig} assets
 * @property {RubikVisualExperienceConfig} visualExperience
 * @property {RubikBannerPackConfig} bannerPack
 * @property {RubikRouteConfig} routes
 * @property {RubikPreviewWarning[]} warnings
 * @property {string} previewBadge     Label shown in non-embed QA mode.
 */

// Export an empty value so this file can be imported as an ES module
// from renderers / consumers, allowing JSDoc imports to resolve.
export const RUBIK_PREVIEW_CONFIG_VERSION = 'v4.0';
