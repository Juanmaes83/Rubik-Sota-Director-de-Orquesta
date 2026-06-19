export const costaInvestMotionBanner = {
  id: "dynamic-motion-banner-costa-invest",
  internalName: "Costa Invest · Experiencia Visual de Propiedad",
  client: {
    name: "Costa Invest",
    claim: "International property, local guidance",
    sector: "Inmobiliaria",
    location: "Playa Flamenca · Orihuela Costa",
    website: "https://costainvest.com/es/",
    email: "info@costainvest.com",
    phone: "+34 966 760 422",
    whatsapp: "+34 966 760 422",
    address: "Playa Flamenca, Orihuela Costa",
  },
  campaign: {
    type: "property_visit",
    name: "Experiencia visual de propiedad",
    headline: "DESCUBRE LA PROPIEDAD",
    headlineAlt: "INVERSIÓN EN COSTA BLANCA",
    subheadline:
      "Experiencia visual, QR y contacto directo para compradores internacionales en Orihuela Costa.",
    cta: "SOLICITA INFORMACIÓN",
    secondaryCta: "ESCANEA Y CONSULTA",
    qrLabel: "Escanea para abrir la experiencia visual",
    supportLine: "Costa Invest · Playa Flamenca · Orihuela Costa",
    badges: ["Propiedad destacada", "Galería visual", "QR", "Consulta desde móvil", "Orihuela Costa"],
  },
  formats: {
    vertical: {
      width: 1080,
      height: 1920,
      ratio: "9:16",
      uses: ["Reel", "Story", "WhatsApp", "Mupi digital vertical", "Escaparate móvil"],
    },
    horizontal: {
      width: 1920,
      height: 1080,
      ratio: "16:9",
      uses: ["Banner web", "Pantalla horizontal", "Header promocional", "Presentación comercial"],
    },
  },
  destination: {
    qrUrl: "https://aurum-properties-boutique.vercel.app/costa-invest",
    webPreviewUrl: "https://rubik-sota-director-de-orquesta.vercel.app/dynamic-motion-banner/costa-invest/",
    premiumDemoUrl: "https://aurum-properties-boutique.vercel.app/costa-invest",
    embeddableHtmlUrl: "https://rubik-sota-director-de-orquesta.vercel.app/dynamic-motion-banner/costa-invest/?embed=1",
  },
  assets: {
    logo: {
      url: "./assets/logo.svg",
      smartUrl: "./assets/logo-smart.svg",
      status: "public_candidate_pending_validation",
      notes: "Logo SVG descargado de la web pública de Costa Invest.",
    },
    images: [
      {
        url: "./assets/property-1.jpg",
        source: "https://costainvest.com/",
        usage: "hero_media",
        status: "public_candidate_pending_validation",
      },
      {
        url: "./assets/property-2.jpg",
        source: "https://costainvest.com/",
        usage: "hero_media",
        status: "public_candidate_pending_validation",
      },
      {
        url: "./assets/property-3.jpg",
        source: "https://costainvest.com/",
        usage: "gallery_media",
        status: "public_candidate_pending_validation",
      },
    ],
    fallbackAssets: [
      {
        url: "./assets/property-1.jpg",
        usage: "fallback_hero",
        status: "public_candidate_pending_validation",
      },
    ],
  },
  disclaimers: ["Preview conceptual", "Activos pendientes de validación"],
  theme: {
    background: "#0d0b09",
    surface: "rgba(255, 255, 255, 0.06)",
    gold: "#c4a96a",
    amber: "#e0c48a",
    text: "#f5f0e8",
    muted: "#b0a390",
    ink: "#12100d",
    accent: "#1a3a5c",
  },
};

export default costaInvestMotionBanner;
