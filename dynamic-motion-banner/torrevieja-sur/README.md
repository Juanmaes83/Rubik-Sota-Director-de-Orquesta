# Torrevieja Sur · Visita Propiedad — Dynamic Motion Banner

Pieza visual dinámica personalizada para **Torrevieja Sur**.
Campaña: **Visita propiedad**.

> Preview conceptual privada. Activos públicos/candidatos pendientes de validación comercial final por parte de Torrevieja Sur.

---

## Cliente

| Campo | Valor |
|-------|-------|
| Empresa | Torrevieja Sur |
| Claim | Tu sueño, nuestra pasión |
| Sector | Inmobiliaria |
| Zona | Torrevieja · Costa Blanca Sur |
| Web | https://torreviejasur.com/ |
| Email | info@torreviejasur.com |
| Teléfono | +34 679 48 16 79 |
| WhatsApp | +34 679 48 16 79 |
| Dirección | Avda. Habaneras 121 · Torrevieja (Alicante) 03182 |
| RAICV | 1058 |

### Stats públicos/candidatos

- +100 casas vendidas al año
- 4.9/5 en Google (+545 reseñas)
- +400 colaboradores
- 25+ años de experiencia

---

## Campaña

- **Headline:** VISITA LA PROPIEDAD
- **Subheadline:** Tour, vídeo y QR para recorrer una vivienda en Torrevieja antes de visitarla.
- **CTA principal:** AGENDA TU VISITA
- **CTA secundario:** ESCANEA Y RECORRE
- **Línea de apoyo:** Torrevieja Sur · Torrevieja · Costa Blanca Sur
- **Badges:** Tour 360 · Vídeo · QR · Visita desde móvil · Torrevieja

---

## Formatos creados

| Formato | Resolución | Ratio | Uso |
|---------|------------|-------|-----|
| Vertical | 1080×1920 | 9:16 | Reel, Story, escaparate vertical, mupi digital vertical |
| Horizontal | 1920×1080 | 16:9 | Banner web, pantalla horizontal, escaparate panorámico, header promocional |
| Web preview | Responsive | — | [`index.html`](./index.html) |
| Embeddable | Responsive | — | [`embed.html`](./embed.html) |

---

## Archivos

| Archivo | Propósito |
|---------|-----------|
| `index.html` | Preview web con selector vertical/horizontal |
| `banner-vertical.html` | Pieza vertical standalone 1080×1920 |
| `banner-horizontal.html` | Pieza horizontal standalone 1920×1080 |
| `embed.html` | Página con iframes embebibles |
| `config.js` | Capa de datos de cliente y campaña |
| `banner-engine.js` | Motor de render 2D/animación reutilizable |
| `assets/` | Logo e imágenes candidatas de Torrevieja Sur |
| `README.md` | Este documento |

---

## Destinos configurables

| Destino | URL |
|---------|-----|
| QR | https://aurum-properties-boutique.vercel.app/torrevieja-sur-web-completa |
| Web premium demo | https://aurum-properties-boutique.vercel.app/torrevieja-sur-web-completa |
| Preview esperada | https://rubik-sota-director-de-orquesta.vercel.app/dynamic-motion-banner/torrevieja-sur/ |

---

## Assets usados

- `assets/logo.svg` — Logo principal descargado de https://torreviejasur.com/ (candidato).
- `assets/logo-smart.svg` — Variante compacta del logo (candidata).
- `assets/property-1.jpg` — Imagen de banner de propiedades de torreviejasur.com (candidata).
- `assets/property-2.jpg` — Imagen de noticias de torreviejasur.com (candidata).
- `assets/property-3.jpg` — Imagen de noticias de torreviejasur.com (candidata).

Todos los assets tienen status `public_candidate_pending_validation`.

---

## Cómo usar

### Preview local

Abre `index.html` en un servidor local (requiere módulos ES):

```bash
npx serve dynamic-motion-banner/torrevieja-sur
```

### Embeber en una web

```html
<!-- Vertical -->
<iframe src="./banner-vertical.html" width="540" height="960" frameborder="0" allow="autoplay" style="max-width:100%;"></iframe>

<!-- Horizontal -->
<iframe src="./banner-horizontal.html" width="960" height="540" frameborder="0" allow="autoplay" style="max-width:100%;"></iframe>
```

### Personalizar para otro cliente

1. Copia la carpeta `dynamic-motion-banner/torrevieja-sur`.
2. Edita `config.js` con los datos del nuevo cliente.
3. Sustituye los assets en `assets/`.
4. Ajusta colores en `config.js` si es necesario.
5. Abre `index.html` para validar.

---

## Qué queda pendiente

- Validación comercial de activos por parte de Torrevieja Sur.
- Sustitución de imágenes candidatas por fotografías profesionales de la propiedad piloto.
- Ajuste fino de tipografía/posiciones si el cliente lo requiere.
- Exportación real a vídeo/MP4 (actualmente es web preview/HTML).
- Tracking/píxeles de conversión.
- Integración CRM si se desea lead directo desde el banner.

---

## Limitaciones

- Pieza conceptual privada.
- Activos públicos/candidatos pendientes de validación.
- QR real y funcional apunta a la demo web premium.
- No hay exportación a vídeo integrada todavía.
- No hay tracking real todavía.

---

## Relación con Web Premium Demo

Esta pieza es el **primer impacto visual comercial**.
La **demo web premium completa** está en:

https://aurum-properties-boutique.vercel.app/torrevieja-sur-web-completa

Lógica comercial: Motion Banner → interés → QR/CTA → demo web premium.
