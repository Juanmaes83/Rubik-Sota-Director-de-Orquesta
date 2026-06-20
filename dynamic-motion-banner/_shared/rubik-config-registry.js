/**
 * Rubik config registry.
 *
 * Public surface:
 *   - getRubikConfigBySlug(slug)   → RubikClientConfig | null
 *   - hasRubikConfig(slug)         → boolean
 *   - listRubikConfigSlugs()       → string[]
 */

import { sandhouseRubikConfig } from './sandhouse-rubik-config.js';
import { embassyLevanteRubikConfig } from './embassy-levante-rubik-config.js';

/** @type {Record<string, import('./types.js').RubikClientConfig>} */
const REGISTRY = {
  [sandhouseRubikConfig.slug]: sandhouseRubikConfig,
  [embassyLevanteRubikConfig.slug]: embassyLevanteRubikConfig,
};

/**
 * @param {string} slug
 * @returns {import('./types.js').RubikClientConfig|null}
 */
export function getRubikConfigBySlug(slug) {
  if (typeof slug !== 'string' || !slug.trim()) return null;
  const key = slug.trim();
  return Object.prototype.hasOwnProperty.call(REGISTRY, key) ? REGISTRY[key] : null;
}

/**
 * @param {string} slug
 * @returns {boolean}
 */
export function hasRubikConfig(slug) {
  return getRubikConfigBySlug(slug) !== null;
}

/**
 * @returns {string[]}
 */
export function listRubikConfigSlugs() {
  return Object.keys(REGISTRY).sort();
}

export default REGISTRY;
