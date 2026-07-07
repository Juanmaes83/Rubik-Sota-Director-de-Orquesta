# Personalization Core Schema

Schema común para convertir cualquier módulo de Rubik en una experiencia personalizada de sector, empresa o marca.

Estado: v0.1 — propuesta documental. No hay runtime que lo consuma todavía; los módulos actuales usan configuración interna + `localStorage`. Este schema define el contrato objetivo para las próximas adaptaciones.

---

## 1. Por qué existe

Hoy la personalización real ya ocurre en Rubik, pero de forma dispersa:

- `production-manifests/*.json` (por cliente: `slug`, `clientName`, `assetMode`, `files`);
- HTML por cliente (`gesture-lab/sandhouse-inmobiliaria-v1.html`, `torrevieja-sur-v1.html`);
- snapshots `localStorage` por módulo (`rubik-sota-<modulo>-<version>-snapshot`).

Este documento unifica esos patrones en un solo contrato para que:

- una empresa pueda pedir "una experiencia WOW para mi marca" y Rubik responda con módulos adaptables sin empezar de cero;
- cualquier IA futura sepa qué campos debe soportar una capa de personalización;
- los motores externos (human, Hand-Gesture-Gaming) usen el mismo vocabulario.

## 2. Schema conceptual (experience.config)

```jsonc
{
  "schema": "rubik-experience-config/v0.1",
  "id": "brand-experience-001",          // único por experiencia
  "module": "interactive-retail-window",  // slug del módulo base en gesture-lab/ o motor externo
  "engine": "rubik-internal",             // rubik-internal | human-vision-engine | arena-control
  "vertical": "retail",                   // retail | real-estate | fashion | food | tourism | automotive | health | education | events | communities

  "brand": {
    "name": "Marca Ejemplo",
    "slug": "marca-ejemplo",              // mismo criterio que production-manifests
    "logoAsset": "assets/shared/placeholder-logo.svg",
    "palette": {
      "primary": "#0E7C66",
      "secondary": "#F4B942",
      "background": "#101418",
      "text": "#FFFFFF"
    },
    "typography": { "heading": "system-ui", "body": "system-ui" },
    "tone": "premium"                     // premium | playful | institutional | urban
  },

  "content": {
    "headline": "Titular de la experiencia",
    "subheadline": "Subtítulo comercial",
    "assets": [
      { "id": "hero-1", "type": "image", "src": "", "origin": "real" }
      // origin: real | generado | editado | ilustrativo | pendiente-de-sustitucion
    ],
    "products": []                        // opcional: catálogo local, patrón Retail Catalog v2.6
  },

  "interaction": {
    "gestures": ["open-hand", "fist", "swipe", "pinch"],
    "touchFallback": true,                // obligatorio true: regla de la plataforma
    "cameraRequired": false,              // el módulo debe ser útil sin cámara
    "kioskMode": false,                   // escaparate / mupi / feria
    "attractLoop": false
  },

  "reward": {
    "type": "code",                       // code | qr | download | ranking | souvenir | discount
    "message": "Tu recompensa",
    "shareLayer": ["png", "whatsapp", "email", "copy-link"]
  },

  "cta": {
    "label": "Quiero saber más",
    "target": "",                         // URL, tel, WhatsApp o landing privada
    "leadCapture": false                  // si true, definir destino del lead (CRM)
  },

  "tracking": { "enabled": false, "qrTarget": "" },

  "meta": {
    "status": "draft",                    // draft | ready | delivered
    "generatedBy": "",
    "notes": ""
  }
}
```

## 3. Reglas del schema

1. **Todo campo visual tiene fallback.** Sin logo → sin hueco roto; sin cámara → control manual.
2. **Todo asset declara `origin`** (Regla 4 de la estrategia): real, generado, editado, ilustrativo o pendiente de sustitución.
3. **`touchFallback` es siempre `true`.** Los gestos son capa opcional, nunca única vía.
4. **El loop se cierra o no se entrega**: si `reward` y `cta` están vacíos, la experiencia es un experimento, no un producto.
5. **Compatibilidad hacia atrás**: los `production-manifests/*.json` actuales son un subconjunto válido (slug, clientName, files); no se migran, se convive con ellos.
6. **Privacidad**: nada de imágenes de usuario a servidor por defecto; el procesamiento de cámara ocurre en el navegador (MediaPipe / human en cliente).

## 4. Cómo lo consume cada capa

| Capa | Uso del schema |
|------|----------------|
| Módulo Gesture Lab (HTML standalone) | Lee un `<script type="application/json">` embebido o un `?config=` con el JSON; aplica brand/palette/content |
| Arena Control (Hand-Gesture-Gaming) | Subconjunto en `public/arena-control.config.json` (ver ese repo) |
| Human Vision Engine (human) | Selección de modelos + skin de experiencia (ver `docs/RUBIK_HUMAN_VISION_ENGINE_ADAPTATION.md` en ese repo) |
| Landing / QR / CRM (futuro) | `tracking`, `cta`, `meta.status` |

## 5. Ruta de implementación recomendada

1. **v0.1 (este doc)**: contrato documentado. ✅
2. **v0.2**: un módulo existente (recomendado: Interactive Retail Window / Retail Window Pro) lee un `experience.config` embebido y aplica marca sin tocar la versión publicada (archivo nuevo, regla de versiones).
3. **v0.3**: generador simple (script Node en `tools/`) que produce un HTML personalizado desde módulo base + config, siguiendo el patrón ya usado por `immersphere-production-orchestrator`.
4. **v0.4**: conexión con QR/landing/tracking según fases 3-4 de la estrategia.
