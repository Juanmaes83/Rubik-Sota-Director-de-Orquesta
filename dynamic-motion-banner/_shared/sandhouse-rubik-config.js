/**
 * Sandhouse Inmobiliaria — Rubik render fixture.
 *
 * Data is the real lead data (Torrevieja, sandhouse.es, +34 655 187 116).
 * This fixture validates the render pipeline. It is NOT a standalone manual
 * page — it goes through the same normalize + render flow as every other
 * client config.
 */

import { normalizeRubikConfig } from './normalize-rubik-config.js';

const SANDHOUSE_RAW_SPECS = {
  visualExperienceSpec: {
    hookName: 'Experiencia Visual de Propiedad',
    narrative:
      'El visitante entra en la experiencia de Sandhouse Inmobiliaria en Torrevieja y ve la propiedad cobrar vida antes de la primera llamada.',
    rubikEmbedUrl:
      'https://rubik-sota-director-de-orquesta.vercel.app/dynamic-motion-banner/sandhouse-inmobiliaria/?embed=1',
    firstImpression: {
      headline: 'Sandhouse Inmobiliaria · Torrevieja',
      subheadline:
        'La mejor manera de encontrar tu hogar en Torrevieja y en la costa levantina.',
      format: 'fullscreen visual, motion on scroll',
    },
    journeyBlocks: [
      {
        moment: 1,
        title: 'Primera mirada',
        description:
          'La propiedad aparece en su mejor contexto. Torrevieja, luz real del Mediterráneo, espacio en movimiento.',
        visualCue: 'Hero editorial con paleta de marca y transición suave.',
      },
      {
        moment: 2,
        title: 'El entorno',
        description:
          'Torrevieja como ventaja de vida: playa, servicios, comunidad y cercanía a la oficina en C/ Lanzarote.',
        visualCue: 'Composición tipográfica editorial sobre fondo cálido.',
      },
      {
        moment: 3,
        title: 'Contacto directo',
        description:
          'Sandhouse Inmobiliaria responde en minutos por WhatsApp o llamada al +34 655 187 116.',
        visualCue: 'CTA dorado prominente con número y enlace WhatsApp.',
      },
    ],
    CTA: {
      label: 'Solicitar información',
      href: 'https://wa.me/34655187116',
      channel: 'whatsapp',
    },
    contact: {
      phone: '+34 655 187 116',
      whatsapp: 'https://wa.me/34655187116',
      email: 'info@sandhouse.es',
      address: 'C/ Lanzarote 21 bajo, 03183 Torrevieja, Alicante',
      schedule: 'Lun-Vie 9h-14h y 17h-20h / Sáb 9h-14h',
      website: 'https://www.sandhouse.es/',
    },
    routes: {
      primary:
        'https://aurum-properties-boutique.vercel.app/sandhouse-inmobiliaria/visual-experience',
    },
  },
  bannerPackSpec: {
    hookName: 'Pack de Banners Personalizados',
    claims: [
      'La mejor manera de encontrar tu hogar en Torrevieja y en la costa levantina.',
      'Especialistas en Torrevieja. Atención personal desde el primer día.',
      'Compra, venta y alquiler. Tu propiedad en Torrevieja con Sandhouse Inmobiliaria.',
    ],
    CTA: {
      label: 'www.sandhouse.es',
      href: 'https://www.sandhouse.es/',
      channel: 'website',
    },
    contact: {
      phone: '+34 655 187 116',
      whatsapp: 'https://wa.me/34655187116',
      email: 'info@sandhouse.es',
      address: 'C/ Lanzarote 21 bajo, 03183 Torrevieja, Alicante',
      schedule: 'Lun-Vie 9h-14h y 17h-20h / Sáb 9h-14h',
      website: 'https://www.sandhouse.es/',
    },
    visualDirection:
      'Composición CSS editorial. Fondo oscuro #080604. Acento dorado #c4a96a. Serif para titular, mono para etiquetas. Sin imágenes de cliente hasta validación de derechos.',
    formatSpecificCopy: {
      vertical: {
        headline:
          'La mejor manera de encontrar tu hogar en Torrevieja y en la costa levantina.',
        subline:
          'Especialistas en Torrevieja. Atención personalizada desde el primer contacto.',
        chips: ['Compra', 'Venta', 'Asesoramiento', 'Torrevieja'],
        contact: {
          phone: '+34 655 187 116',
          email: 'info@sandhouse.es',
          cta: 'Solicitar visita',
        },
        address: 'C/ Lanzarote 21 bajo, 03183 Torrevieja, Alicante',
        schedule: 'Lun-Vie 9h-14h y 17h-20h / Sáb 9h-14h',
        format:
          'Composición CSS 9:16. Top bar: marca + ratio. Centro: headline serif + subline + chips. Bottom: teléfono + CTA dorado.',
      },
      horizontal: {
        headline:
          'La mejor manera de encontrar tu hogar en Torrevieja y en la costa levantina.',
        subline:
          'Agencia inmobiliaria con atención personalizada en Torrevieja.',
        leftColumn: {
          brand: 'Sandhouse Inmobiliaria',
          headline:
            'Tu hogar en Torrevieja y la Costa Levantina.',
          claim: 'Torrevieja · Alicante',
        },
        rightColumn: {
          chips: ['Compra', 'Venta', 'Asesoramiento'],
          contact: {
            address: 'C/ Lanzarote 21 bajo, 03183 Torrevieja, Alicante',
            phone: '+34 655 187 116',
            email: 'info@sandhouse.es',
          },
          cta: 'www.sandhouse.es',
          schedule: 'Lun-Vie 9h-14h y 17h-20h / Sáb 9h-14h',
        },
        format:
          'Composición CSS 16:9. Divisor vertical al 55%. Izquierda: branding + headline. Derecha: chips + contacto + CTA.',
      },
    },
    routes: {
      pack: 'https://aurum-properties-boutique.vercel.app/banners/sandhouse-inmobiliaria',
    },
  },
  rubikConfigSeed: {
    slug: 'sandhouse-inmobiliaria',
    clientName: 'Sandhouse Inmobiliaria',
    zone: 'Torrevieja',
    sector: 'Inmobiliaria residencial',
    claim:
      'La mejor manera de encontrar tu hogar en Torrevieja y en la costa levantina.',
    cta: 'Solicitar visita',
    palette: { primary: '#c4a96a', background: '#080604', text: '#f5f0e8' },
    logo: null,
    heroImage: null,
  },
};

export const sandhouseRubikConfig = normalizeRubikConfig(SANDHOUSE_RAW_SPECS);
export const sandhouseRubikRawSpecs = SANDHOUSE_RAW_SPECS;
export default sandhouseRubikConfig;
