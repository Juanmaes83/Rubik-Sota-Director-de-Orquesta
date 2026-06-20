export const embassyLevanteMotionBanner = {
  id: "dynamic-motion-banner-embassy-levante",
  internalName: "Embassy Levante · Captación de propietarios · Torrevieja",
  client: {
    name: "Embassy Levante",
    claim: "El propietario elige la agencia que más le convence.",
    sector: "Inmobiliaria",
    location: "Torrevieja · Alicante",
    website: "https://www.embassylevante.com/",
    email: "luisiglesias@embassylevante.com",
    phone: "+34 691 502 743",
    whatsapp: "+34 691 502 743",
    address: "Torrevieja, Alicante",
  },
  campaign: {
    type: "property_capture",
    name: "Captación de propietarios",
    headline: "TU PROPIEDAD EN TORREVIEJA",
    headlineAlt: "CAPTACIÓN CON IMPACTO VISUAL",
    subheadline:
      "Embassy Levante muestra al propietario cómo se presentará su vivienda antes de firmar el mandato.",
    cta: "SOLICITAR INFORMACIÓN",
    secondaryCta: "ESCANEA Y CONSULTA",
    qrLabel: "Escanea para ver la experiencia visual completa",
    supportLine: "Embassy Levante · Torrevieja · Alicante",
    badges: ["Captación", "Compra", "Venta", "Torrevieja", "Costa Blanca"],
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
    qrUrl: "https://aurum-properties-boutique.vercel.app/embassy-levante",
    webPreviewUrl: "https://rubik-sota-director-de-orquesta.vercel.app/dynamic-motion-banner/embassy-levante/",
    premiumDemoUrl: "https://aurum-properties-boutique.vercel.app/embassy-levante",
    embeddableHtmlUrl: "https://rubik-sota-director-de-orquesta.vercel.app/dynamic-motion-banner/embassy-levante/?embed=1",
  },
  assets: {
    logo: {
      url: "/dynamic-motion-banner/embassy-levante/assets/logo.png",
      smartUrl: "/dynamic-motion-banner/embassy-levante/assets/logo.png",
      status: "public_candidate_pending_validation",
      notes: "Logo descargado de embassylevante.com/img/header/logo.png",
    },
    images: [
      {
        url: "/dynamic-motion-banner/embassy-levante/assets/property-1.jpg",
        source: "aurum_generic_placeholder",
        usage: "hero_media",
        status: "placeholder_pending_client_assets",
      },
      {
        url: "/dynamic-motion-banner/embassy-levante/assets/property-2.jpg",
        source: "aurum_generic_placeholder",
        usage: "hero_media",
        status: "placeholder_pending_client_assets",
      },
      {
        url: "/dynamic-motion-banner/embassy-levante/assets/property-3.jpg",
        source: "aurum_generic_placeholder",
        usage: "gallery_media",
        status: "placeholder_pending_client_assets",
      },
    ],
    fallbackAssets: [
      {
        url: "/dynamic-motion-banner/embassy-levante/assets/property-1.jpg",
        usage: "fallback_hero",
        status: "placeholder_pending_client_assets",
      },
    ],
  },
  disclaimers: ["Preview conceptual", "Activos pendientes de validación"],
  theme: {
    background: "#080604",
    surface: "rgba(255, 255, 255, 0.06)",
    gold: "#c4a96a",
    amber: "#e0c48a",
    text: "#f5f0e8",
    muted: "#b0a390",
    ink: "#080604",
    accent: "#c4a96a",
  },
};

export default embassyLevanteMotionBanner;
