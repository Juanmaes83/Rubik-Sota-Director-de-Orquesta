/**
 * Casas y Mar · Visita Propiedad
 * Dynamic Motion Banner — capa de datos de campaña
 *
 * Todos los datos se usan como información pública/candidata pendiente de
 * validación comercial final por parte de Casas y Mar.
 */

export const casasYMarMotionBanner = {
  id: "dynamic-motion-banner-casas-y-mar-visita-propiedad",
  internalName: "Casas y Mar · Visita Propiedad",
  client: {
    name: "Casas y Mar",
    claim: "Tu sueño, nuestra pasión",
    sector: "Inmobiliaria",
    location: "Torrevieja · Costa Blanca Sur",
    website: "https://casasymar.com/",
    email: "contactos@casasymar.es",
    phone: "+34 965 714 261",
    whatsapp: "+34 629 581 574",
    address: "Avda. Habaneras 121 · Torrevieja (Alicante) 03182",
    raicv: "1058",
  },
  campaign: {
    type: "property_visit",
    name: "Visita propiedad",
    headline: "VISITA LA PROPIEDAD",
    headlineAlt: "RECORRE LA PROPIEDAD",
    subheadline:
      "Tour, vídeo y QR para recorrer una vivienda en Torrevieja antes de visitarla.",
    cta: "AGENDA TU VISITA",
    secondaryCta: "ESCANEA Y RECORRE",
    qrLabel: "Escanea para abrir la experiencia inmersiva",
    supportLine: "Casas y Mar · Torrevieja · Costa Blanca Sur",
    badges: ["Tour 360", "Vídeo", "QR", "Visita desde móvil", "Torrevieja"],
  },
  formats: {
    vertical: {
      width: 1080,
      height: 1920,
      ratio: "9:16",
      uses: ["Reel", "Story", "Escaparate vertical", "Mupi digital vertical"],
    },
    horizontal: {
      width: 1920,
      height: 1080,
      ratio: "16:9",
      uses: ["Banner web", "Pantalla horizontal", "Escaparate panorámico", "Header promocional"],
    },
  },
  destination: {
    qrUrl: "https://aurum-properties-boutique.vercel.app/casas-y-mar",
    webPreviewUrl: "https://rubik-sota-director-de-orquesta.vercel.app/dynamic-motion-banner/casas-y-mar-visita-propiedad/",
    premiumDemoUrl: "https://aurum-properties-boutique.vercel.app/casas-y-mar",
    embeddableHtmlUrl: "./embed.html",
  },
  assets: {
    logo: {
      url: "./assets/logo.svg",
      smartUrl: "./assets/logo-smart.svg",
      status: "public_candidate_pending_validation",
      notes:
        "Logo SVG descargado de la web pública de Casas y Mar. Pendiente de validación oficial.",
    },
    images: [
      {
        url: "./assets/property-1.jpg",
        source: "https://casasymar.com/propiedades/",
        usage: "hero_media",
        status: "public_candidate_pending_validation",
      },
      {
        url: "./assets/property-2.jpg",
        source: "https://casasymar.com/noticias/",
        usage: "hero_media",
        status: "public_candidate_pending_validation",
      },
      {
        url: "./assets/property-3.jpg",
        source: "https://casasymar.com/noticias/",
        usage: "gallery_media",
        status: "public_candidate_pending_validation",
      },
    ],
    videos: [],
    fallbackAssets: [
      {
        url: "./assets/property-2.jpg",
        usage: "fallback_hero",
        status: "placeholder_pending_client_assets",
      },
    ],
  },
  disclaimers: [
    "Preview conceptual",
    "Activos pendientes de validación",
  ],
  theme: {
    background: "#0f0e0c",
    surface: "rgba(255, 255, 255, 0.06)",
    gold: "#c9a66b",
    amber: "#e8cd9a",
    text: "#f7f1e8",
    muted: "#b8aa98",
    ink: "#15120e",
    accent: "#0901ac",
  },
};

export default casasYMarMotionBanner;
