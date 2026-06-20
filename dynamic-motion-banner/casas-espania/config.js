export const casasEspaniaMotionBanner = {
  id: "dynamic-motion-banner-casas-espania",
  internalName: "Casas Espania · Captación de propietarios · Torrevieja",
  client: {
    name: "Casas Espania",
    claim: "El propietario elige la agencia que más le convence.",
    sector: "Inmobiliaria",
    location: "Torrevieja · Alicante",
    website: "https://casasespania.com/",
    email: "info@casasespania.com",
    phone: "+34 966 785 202",
    whatsapp: "+34 966 785 202",
    address: "Torrevieja, Alicante",
  },
  campaign: {
    type: "property_capture",
    name: "Captación de propietarios",
    headline: "TU PROPIEDAD EN TORREVIEJA",
    headlineAlt: "CAPTACIÓN CON IMPACTO VISUAL",
    subheadline:
      "Casas Espania muestra al propietario cómo se presentará su vivienda antes de firmar el mandato.",
    cta: "SOLICITAR INFORMACIÓN",
    secondaryCta: "ESCANEA Y CONSULTA",
    qrLabel: "Escanea para ver la experiencia visual completa",
    supportLine: "Casas Espania · Torrevieja · Alicante",
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
    qrUrl: "https://aurum-properties-boutique.vercel.app/casas-espania",
    webPreviewUrl: "https://rubik-sota-director-de-orquesta.vercel.app/dynamic-motion-banner/casas-espania/",
    premiumDemoUrl: "https://aurum-properties-boutique.vercel.app/casas-espania",
    embeddableHtmlUrl: "https://rubik-sota-director-de-orquesta.vercel.app/dynamic-motion-banner/casas-espania/?embed=1",
  },
  assets: {
    logo: {
      url: "/dynamic-motion-banner/casas-espania/assets/logo.svg",
      smartUrl: "/dynamic-motion-banner/casas-espania/assets/logo.svg",
      status: "public_candidate_pending_validation",
      notes: "Logo descargado de casasespania.com/media/images/website/new-websitelogo.svg",
    },
    images: [
      {
        url: "https://aurum-properties-boutique.vercel.app/IMAGEN_AURUM_HEROWEB.png",
        source: "https://aurum-properties-boutique.vercel.app/IMAGEN_AURUM_HEROWEB.png",
        sourceOrigin: "internal_generated_asset",
        usage: "hero_media",
        status: "placeholder_pending_client_assets",
        notes: "Imagen placeholder premium AURUM — pendiente de fotos reales de casasespania.com",
      },
      {
        url: "https://aurum-properties-boutique.vercel.app/IMAGEN_AURUM_INTERIORES.png",
        source: "https://aurum-properties-boutique.vercel.app/IMAGEN_AURUM_INTERIORES.png",
        sourceOrigin: "internal_generated_asset",
        usage: "hero_media",
        status: "placeholder_pending_client_assets",
        notes: "Imagen placeholder premium AURUM — pendiente de fotos reales de casasespania.com",
      },
      {
        url: "https://aurum-properties-boutique.vercel.app/IMAGEN_AURUM_ESTILODEVIDA.png",
        source: "https://aurum-properties-boutique.vercel.app/IMAGEN_AURUM_ESTILODEVIDA.png",
        sourceOrigin: "internal_generated_asset",
        usage: "gallery_media",
        status: "placeholder_pending_client_assets",
        notes: "Imagen placeholder premium AURUM — pendiente de fotos reales de casasespania.com",
      },
    ],
    fallbackAssets: [
      {
        url: "https://aurum-properties-boutique.vercel.app/IMAGEN_AURUM_HEROWEB.png",
        usage: "fallback_hero",
        status: "placeholder_pending_client_assets",
      },
    ],
  },
  disclaimers: ["Preview conceptual", "Imágenes placeholder — pendiente de activos reales Casas Espania"],
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

export default casasEspaniaMotionBanner;
