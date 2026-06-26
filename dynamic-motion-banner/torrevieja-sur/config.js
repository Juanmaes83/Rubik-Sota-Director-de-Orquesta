/**
 * Torrevieja Sur · Visita Propiedad
 * Dynamic Motion Banner — capa de datos de campaña
 *
 * Todos los datos se usan como información pública/candidata pendiente de
 * validación comercial final por parte de Torrevieja Sur.
 */

export const torreviejaSurMotionBanner = {
  id: "dynamic-motion-banner-torrevieja-sur",
  internalName: "Torrevieja Sur · Visita Propiedad",
  client: {
    name: "Torrevieja Sur",
    claim: "Tu inmobiliaria en Torrevieja",
    sector: "Inmobiliaria",
    location: "Torrevieja · Costa Blanca Sur",
    website: "https://torreviejasur.com/",
    email: "info@torreviejasur.com",
    phone: "+34 679 48 16 79",
    whatsapp: "+34 679 48 16 79",
    address: "Torrevieja, Alicante",
    raicv: "",
  },
  campaign: {
    type: "property_visit",
    name: "Visita propiedad",
    headline: "VISITA LA PROPIEDAD",
    headlineAlt: "RECORRE LA PROPIEDAD",
    subheadline:
      "Tour, vídeo y QR para que un comprador recorra la propiedad antes de la visita.",
    cta: "AGENDA TU VISITA",
    secondaryCta: "ESCANEA Y RECORRE",
    qrLabel: "Escanea para abrir la experiencia inmersiva",
    supportLine: "Torrevieja Sur · Torrevieja · Alicante",
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
    qrUrl: "https://aurum-properties-boutique.vercel.app/torrevieja-sur-web-completa",
    webPreviewUrl: "https://rubik-sota-director-de-orquesta.vercel.app/dynamic-motion-banner/torrevieja-sur/",
    premiumDemoUrl: "https://aurum-properties-boutique.vercel.app/torrevieja-sur-web-completa",
    embeddableHtmlUrl: "./embed.html",
  },
  assets: {
    logo: {
      url: "./assets/logo.svg",
      smartUrl: "./assets/logo-smart.svg",
      status: "public_candidate_pending_validation",
      notes:
        "Wordmark neutral de Torrevieja Sur. No reutiliza identidad visual de otro lead; sustituir por logo oficial validado si el cliente lo aporta.",
    },
    images: [
      {
        url: "./assets/property-1.jpg",
        source: "https://torreviejasur.com/property-category/apartamentos/",
        usage: "hero_media",
        status: "public_candidate_pending_validation",
      },
      {
        url: "./assets/property-2.jpg",
        source: "https://torreviejasur.com/",
        usage: "hero_media",
        status: "public_candidate_pending_validation",
      },
      {
        url: "./assets/property-3.jpg",
        source: "https://torreviejasur.com/",
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

export default torreviejaSurMotionBanner;
