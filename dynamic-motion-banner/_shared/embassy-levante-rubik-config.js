/**
 * Embassy Levante — Rubik render fixture.
 *
 * Real lead data: Torrevieja, embassylevante.com, +34 691 502 743.
 * Assets: awaiting rights validation — using CSS editorial fallback.
 */

import { normalizeRubikConfig } from './normalize-rubik-config.js';

const EMBASSY_LEVANTE_RAW_SPECS = {
  visualExperienceSpec: {
    hookName: 'Experiencia Visual de Propiedad',
    narrative:
      'El visitante entra en la experiencia de Embassy Levante en Torrevieja y descubre cómo se presenta una propiedad antes de la primera llamada.',
    rubikEmbedUrl:
      'https://rubik-sota-director-de-orquesta.vercel.app/dynamic-motion-banner/embassy-levante/?embed=1',
    firstImpression: {
      headline: 'Embassy Levante · Torrevieja',
      subheadline:
        'El propietario quiere saber cómo venderéis su vivienda. Immersphere lo muestra antes de firmar.',
      format: 'fullscreen visual, motion on scroll',
    },
    journeyBlocks: [
      {
        moment: 1,
        title: 'Primera imagen',
        description:
          'La propiedad aparece en su mejor contexto. Torrevieja, luz mediterránea, espacio en movimiento.',
        visualCue: 'Hero editorial con paleta de marca y transición suave.',
      },
      {
        moment: 2,
        title: 'El argumento visual',
        description:
          'Embassy Levante muestra al propietario exactamente cómo se presentará su vivienda antes de firmar.',
        visualCue: 'Composición tipográfica editorial sobre fondo premium.',
      },
      {
        moment: 3,
        title: 'Contacto directo',
        description:
          'Embassy Levante responde en minutos por WhatsApp o llamada al +34 691 502 743.',
        visualCue: 'CTA dorado prominente con número y enlace WhatsApp.',
      },
    ],
    CTA: {
      label: 'Solicitar información',
      href: 'https://wa.me/34691502743',
      channel: 'whatsapp',
    },
    contact: {
      phone: '+34 691 502 743',
      whatsapp: 'https://wa.me/34691502743',
      email: 'luisiglesias@embassylevante.com',
      address: 'Torrevieja, Alicante',
      website: 'https://www.embassylevante.com/',
    },
    routes: {
      primary:
        'https://aurum-properties-boutique.vercel.app/visual-experience/embassy-levante',
    },
  },
  bannerPackSpec: {
    hookName: 'Pack de Banners Personalizados',
    claims: [
      'El propietario quiere saber cómo venderéis su vivienda. Immersphere lo muestra antes de firmar.',
      'Captación de propietarios en Torrevieja con impacto visual desde el primer momento.',
      'Compra, venta y alquiler. Tu propiedad en Torrevieja con Embassy Levante.',
    ],
    CTA: {
      label: 'www.embassylevante.com',
      href: 'https://www.embassylevante.com/',
      channel: 'website',
    },
    contact: {
      phone: '+34 691 502 743',
      whatsapp: 'https://wa.me/34691502743',
      email: 'luisiglesias@embassylevante.com',
      address: 'Torrevieja, Alicante',
      website: 'https://www.embassylevante.com/',
    },
    visualDirection:
      'Composición CSS editorial. Fondo oscuro #080604. Acento dorado #c4a96a. Serif para titular, mono para etiquetas. Sin imágenes de cliente hasta validación de derechos.',
    formatSpecificCopy: {
      vertical: {
        headline:
          'El propietario quiere saber cómo venderéis su vivienda. Immersphere lo muestra antes de firmar.',
        subline:
          'Captación de propietarios en Torrevieja con argumento visual real.',
        chips: ['Compra', 'Venta', 'Captación', 'Torrevieja'],
        contact: {
          phone: '+34 691 502 743',
          email: 'luisiglesias@embassylevante.com',
          cta: 'Solicitar visita',
        },
        address: 'Torrevieja, Alicante',
        format:
          'Composición CSS 9:16. Top bar: marca + ratio. Centro: headline serif + subline + chips. Bottom: teléfono + CTA dorado.',
      },
      horizontal: {
        headline:
          'El propietario quiere saber cómo venderéis su vivienda.',
        subline:
          'Agencia inmobiliaria con captación visual en Torrevieja.',
        leftColumn: {
          brand: 'Embassy Levante',
          headline: 'Tu propiedad en Torrevieja con Embassy Levante.',
          claim: 'Torrevieja · Alicante',
        },
        rightColumn: {
          chips: ['Compra', 'Venta', 'Captación'],
          contact: {
            address: 'Torrevieja, Alicante',
            phone: '+34 691 502 743',
            email: 'luisiglesias@embassylevante.com',
          },
          cta: 'www.embassylevante.com',
        },
        format:
          'Composición CSS 16:9. Divisor vertical al 55%. Izquierda: branding + headline. Derecha: chips + contacto + CTA.',
      },
    },
    routes: {
      pack: 'https://aurum-properties-boutique.vercel.app/banners/embassy-levante',
    },
  },
  rubikConfigSeed: {
    slug: 'embassy-levante',
    clientName: 'Embassy Levante',
    zone: 'Torrevieja',
    sector: 'Inmobiliaria',
    claim:
      'El propietario quiere saber cómo venderéis su vivienda. Immersphere lo muestra antes de firmar.',
    cta: 'Solicitar información',
    palette: { primary: '#c4a96a', background: '#080604', text: '#f5f0e8' },
    logo: 'https://aurum-properties-boutique.vercel.app/embassylevante/website-logo.png',
    heroImage: 'https://aurum-properties-boutique.vercel.app/IMAGEN_AURUM_HEROWEB_2.jpeg',
  },
};

export const embassyLevanteRubikConfig = normalizeRubikConfig(EMBASSY_LEVANTE_RAW_SPECS);
export const embassyLevanteRubikRawSpecs = EMBASSY_LEVANTE_RAW_SPECS;
export default embassyLevanteRubikConfig;
