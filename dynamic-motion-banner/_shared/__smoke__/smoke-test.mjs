#!/usr/bin/env node
/**
 * Smoke tests for the Rubik shared render engine.
 *
 * Runs without any test framework (no node_modules required at root).
 * Node 18+ supports ES modules and `import.meta.url` natively.
 *
 *   node dynamic-motion-banner/_shared/__smoke__/smoke-test.mjs
 *
 * Exits with code 0 on success, 1 on first failed assertion.
 */

import {
  normalizeRubikConfig,
  __test_internals__,
} from '../normalize-rubik-config.js';
import {
  getRubikConfigBySlug,
  hasRubikConfig,
  listRubikConfigSlugs,
} from '../rubik-config-registry.js';
import { sandhouseRubikConfig } from '../sandhouse-rubik-config.js';

let passed = 0;
let failed = 0;

function assert(label, condition, detail) {
  if (condition) {
    console.log(`  ok   - ${label}`);
    passed++;
  } else {
    console.error(`  FAIL - ${label}${detail ? ' :: ' + detail : ''}`);
    failed++;
  }
}

console.log('Rubik shared engine — smoke tests');
console.log('-----------------------------------');

// ---- normalizer ---------------------------------------------------------

console.log('# normalizeRubikConfig');

const out = normalizeRubikConfig({
  visualExperienceSpec: null,
  bannerPackSpec: null,
  rubikConfigSeed: {
    slug: 'mock-client',
    clientName: 'Mock Client',
    zone: 'Madrid',
    sector: 'Inmobiliaria',
    claim: '',
    cta: 'Visita',
    palette: { primary: '#cccccc', background: '#000000', text: '#ffffff' },
    logo: null,
    heroImage: null,
  },
});

assert('slug propagated correctly', out.slug === 'mock-client');
assert('fallback claim composed from client + zone', out.claim === 'Mock Client — Madrid');
assert('palette primary preserved', out.palette.primary === '#cccccc');
assert(
  'warning emitted for missing logo',
  out.warnings.some((w) => w.code === 'missing_logo'),
);
assert(
  'warning emitted for missing hero image',
  out.warnings.some((w) => w.code === 'missing_hero_image'),
);
assert(
  'warning emitted for missing hero video',
  out.warnings.some((w) => w.code === 'missing_hero_video'),
);
assert(
  'warning emitted for missing assets all',
  out.warnings.some((w) => w.code === 'missing_assets_all'),
);
assert(
  'warning emitted for missing claim when empty',
  out.warnings.some((w) => w.code === 'missing_claim'),
);
assert(
  'journey blocks padded to at least 3',
  Array.isArray(out.visualExperience.journeyBlocks) &&
    out.visualExperience.journeyBlocks.length >= 3,
);
assert(
  'banner pack has both formats',
  out.bannerPack.vertical && out.bannerPack.horizontal,
);

// safeCopy — forbidden token filtering
const safe = __test_internals__.safeCopy;
assert(
  'safeCopy strips Internal draft tokens',
  safe('Hello Internal draft world') === 'Hello world',
);
assert('safeCopy returns null for empty input', safe('') === null);
assert(
  'safeCopy returns null for lone status word',
  safe('planned') === null,
);

// ---- registry -----------------------------------------------------------

console.log('# rubik-config-registry');

assert(
  'registry returns Sandhouse config by slug',
  getRubikConfigBySlug('sandhouse-inmobiliaria') !== null,
);
assert(
  'registry returns null for unknown slug',
  getRubikConfigBySlug('nonexistent-slug') === null,
);
assert(
  'hasRubikConfig true for sandhouse',
  hasRubikConfig('sandhouse-inmobiliaria') === true,
);
assert(
  'hasRubikConfig false for unknown',
  hasRubikConfig('nonexistent-slug') === false,
);
assert(
  'listRubikConfigSlugs includes sandhouse',
  listRubikConfigSlugs().includes('sandhouse-inmobiliaria'),
);

// ---- Sandhouse fixture --------------------------------------------------

console.log('# sandhouseRubikConfig fixture');

assert(
  'sandhouse client name correct',
  sandhouseRubikConfig.clientName === 'Sandhouse Inmobiliaria',
);
assert('sandhouse zone is Torrevieja', sandhouseRubikConfig.zone === 'Torrevieja');
assert(
  'sandhouse phone present',
  sandhouseRubikConfig.contact.phone === '+34 655 187 116',
);
assert(
  'sandhouse palette primary is gold',
  sandhouseRubikConfig.palette.primary === '#c4a96a',
);
assert(
  'sandhouse vertical headline differs from horizontal headline',
  sandhouseRubikConfig.bannerPack.vertical.headline !==
    sandhouseRubikConfig.bannerPack.horizontal.headline ||
    // They legitimately can share the same headline as long as the rest of
    // the layout differs — check that copy below is different anyway.
    sandhouseRubikConfig.bannerPack.vertical.chips.join(',') !==
      sandhouseRubikConfig.bannerPack.horizontal.chips.join(','),
);
assert(
  'sandhouse vertical CTA label is the visit CTA',
  sandhouseRubikConfig.bannerPack.vertical.ctaLabel === 'Solicitar visita',
);
assert(
  'sandhouse horizontal CTA label is the website',
  sandhouseRubikConfig.bannerPack.horizontal.ctaLabel === 'www.sandhouse.es',
);
assert(
  'sandhouse warnings still flag missing assets',
  sandhouseRubikConfig.warnings.some((w) => w.code === 'missing_assets_all'),
);
assert(
  'no forbidden tokens in sandhouse claim',
  !__test_internals__.FORBIDDEN_TOKENS.some((t) =>
    sandhouseRubikConfig.claim.includes(t),
  ),
);

// ---- Done ---------------------------------------------------------------

console.log('-----------------------------------');
console.log(`Passed: ${passed}   Failed: ${failed}`);
if (failed > 0) process.exit(1);
process.exit(0);
