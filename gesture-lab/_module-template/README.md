# Rubik Sota Gesture Lab - Module Factory Base

Plantilla madre neutral para fabricar nuevos modulos Gesture Lab sin arrastrar texto, ID huerfanos, mojibake ni librerias de modulos anteriores.

**NO publicar esta carpeta como modulo final.** Es base de clonado.

---

## Para que sirve

- Generar nuevos modulos sectoriales rapidamente (Real Estate Capture Tour, Interactive Retail Window, Fashion Mirror, Product 360, Food Assembly, Golf Visualizer, Nautical Visualizer, Museo / Patrimonio, Interactive Mupi, Selfie Campaign, etc.).
- Reutilizar la base comun validada en Bola de Imagen, Before / After Reforma, Community Improvement / Vecinia y Real Estate Immersive Viewer.
- Evitar copiar HTML contaminado de otros modulos.
- Mantener una arquitectura coherente, oscura y premium en toda la familia Gesture Lab.

---

## Archivos de la plantilla

- `gesture-lab/_module-template/module-template.html`
  HTML standalone con CSS y JS internos. Sin dependencias externas (solo Google Fonts como el resto del Lab).
- `gesture-lab/_module-template/README.md`
  Este documento.

---

## Como clonar la plantilla para un modulo nuevo

1. Crear carpeta del modulo:
   `gesture-lab/<modulo-slug>/`
2. Copiar la plantilla:
   `cp gesture-lab/_module-template/module-template.html gesture-lab/<modulo-slug>/rubik-sota-<modulo-slug>-v<version>.html`
3. Renombrar la rama feature y crearla desde `main`:
   `feature/gesture-lab-v<version>-<modulo-slug>`
4. Sustituir todos los placeholders `{{...}}` por valores reales del modulo.
5. Ajustar las 6 categorias del selector segun el sector.
6. Activar / desactivar features en `MODULE_CONFIG.features`.
7. Validar (ver seccion Validaciones).
8. Probar en localhost (no en `file://`).
9. Solo tras revision visual, commit + merge + push.

---

## Lista de placeholders

Todos los placeholders deben sustituirse antes de publicar un modulo final.

### Identidad del modulo
- `{{MODULE_NUMBER}}` - numero correlativo del modulo en el Hub (ej. "05").
- `{{MODULE_NAME}}` - nombre comercial del modulo (ej. "Real Estate Capture Tour").
- `{{MODULE_VERSION}}` - version (ej. "v2.4").
- `{{MODULE_SLUG}}` - slug interno (ej. "real-estate-capture-tour").

### Bloque explicativo
- `{{MODULE_TAGLINE}}` - frase corta de propuesta de valor.
- `{{MODULE_DESCRIPTION}}` - descripcion breve operativa.
- `{{TARGET_USER}}` - usuario objetivo (agente, retailer, propietario, etc.).
- `{{USE_CASE}}` - caso de uso concreto.
- `{{BUSINESS_OUTPUT}}` - resultado comercial esperado.
- `{{MVP_STATUS}}` - estado del MVP (en desarrollo, beta, estable...).

### Imagenes
- `{{PRIMARY_IMAGE_LABEL}}` - etiqueta del slot principal (ej. "Estado actual", "Producto").
- `{{SECONDARY_IMAGE_LABEL}}` - etiqueta del slot secundario (ej. "Version comercial", "Resultado").

### Selector generico
- `{{CATEGORY_1}}` ... `{{CATEGORY_6}}` - 6 categorias / zonas / items del modulo.
  Ejemplos por vertical:
  - Real Estate: Salon, Cocina, Dormitorio, Bano, Terraza, Fachada
  - Retail: Producto 1, Producto 2, Producto 3, Producto 4, Producto 5, Producto 6
  - Moda: Look 1, Look 2, Look 3, Casual, Editorial, Campania
  - Food: Plato, Ingrediente, Salsa, Bebida, Packaging, Menu
  - Golf: Hoyo, Green, Bunker, Fairway, Rough, Trayectoria
  - Museo: Pieza, Sala, Mapa, Detalle, Capa historica, Recorrido

### Exportacion y persistencia
- `{{EXPORT_SLUG}}` - prefijo para nombres de archivo (ej. "rubik-sota-real-estate-capture-tour-v2-4").
- `{{LOCAL_STORAGE_KEY}}` - key unica de localStorage (ej. "rubik-sota-real-estate-capture-tour-v2-4-snapshot").

### Share / mensajeria
- `{{WHATSAPP_INTRO}}` - intro del mensaje de WhatsApp.
- `{{EMAIL_SUBJECT}}` - asunto del email.
- `{{EMAIL_BODY_INTRO}}` - intro del cuerpo del email.

---

## Features comunes

Todas las features comunes vienen activadas por defecto en `MODULE_CONFIG.features`:

- `camera` - boton Activar camara + apertura del modal de captura in-app.
- `upload` - subida de imagen desde galeria.
- `compare` - canvas 2D comparativo con modos Cortina, Fundido y Split 50/50.
- `fullscreen` - vista completa con clase CSS propia + Fullscreen API best-effort.
- `pngExport` - descarga PNG del estado actual del canvas.
- `videoRecording` - grabacion del canvas (canvas.captureStream + MediaRecorder).
- `whatsappShare` - share via `wa.me/?text=`.
- `emailShare` - share via `mailto:`.
- `copyLink` - copiar URL con `navigator.clipboard` y fallback.
- `localStorage` - guardar configuracion (categoria, modo, reveal, version) en una key dedicada.

Si una feature no aplica a tu modulo, ponla a `false` en `MODULE_CONFIG.features` y la plantilla ocultara el boton correspondiente automaticamente via `applyFeatureGates()`.

---

## Features opcionales (slots tecnologicos)

La plantilla deja preparados estos slots **sin cargar ninguna libreria**. Activa el flag en `MODULE_CONFIG.features` y carga la dependencia minima dentro del slot correspondiente:

- `handTracking` -> `HAND_TRACKING_SLOT` (ej. MediaPipe Hands).
- `selfieMode` -> `SELFIE_MODE_SLOT` (camara frontal).
- `catalogueMode` -> `CATALOGUE_MODE_SLOT` (catalogo de productos).
- `cartMode` -> `CART_MODE_SLOT` (carrito).
- `qrMode` -> `QR_MODE_SLOT` (lector / escritor QR).
- `threeDMode` -> `THREE_D_SLOT` (Three.js u otro renderer 3D).

Reemplaza el comentario del slot por el `<script>` o el codigo concreto solo cuando el modulo lo requiera. No incluir librerias "por si acaso".

---

## Proceso recomendado para crear un modulo nuevo

1. **Crear carpeta**: `gesture-lab/<slug>/`.
2. **Copiar template** y renombrar: `rubik-sota-<slug>-v<version>.html`.
3. **Crear rama feature**: `feature/gesture-lab-v<version>-<slug>`.
4. **Sustituir placeholders** (`{{...}}`) en HTML y JS.
5. **Ajustar categorias** (6) y paletas en `CATEGORIES` segun el sector.
6. **Ajustar textos** del hero, captions, scene labels y share intros.
7. **Activar / desactivar features** en `MODULE_CONFIG.features`.
8. **Cargar slot tecnologico** solo si aplica al modulo.
9. **Validar** (ver siguiente seccion).
10. **Probar en localhost** (no `file://`).
11. **Revision visual** en desktop y movil.
12. **Solo tras aprobacion**: `git add`, commit, merge no-ff, push.

---

## Validaciones obligatorias antes de commit

Antes de commitear un modulo derivado de esta plantilla, ejecutar:

### Limpieza
- 0 placeholders `{{...}}` sin sustituir en el HTML del modulo final.
- 0 ocurrencias de `Module Template Base`, `Module Factory Base` u otros textos genericos de la plantilla en el modulo final.
- 0 referencias a otros modulos cuyos textos / slugs no correspondan.

### Mojibake (UTF-8)
Buscar y confirmar 0 ocurrencias de:
- `Â`
- `Ã`
- `â`
- caracter U+FFFD (`�`)

Preferir ASCII o entidades HTML seguras (`&aacute;`, `&oacute;`, `&ntilde;`, `&mdash;`, `&middot;`, etc.) si el editor / pipeline ha dado problemas de codificacion en otras fases del repo.

### Integridad tecnica
- `node --check` sobre el bloque `<script>` extraido.
- 0 IDs duplicados.
- 0 referencias `getElementById(...)` huerfanas (todas resueltas).
- Enlaces relativos correctos: `../index.html` para volver al Hub.
- `MODULE_CONFIG.exportSlug` y `MODULE_CONFIG.localStorageKey` coherentes con el slug del modulo.

### Git
- `git diff --check` sin errores de whitespace ni conflict markers.
- `git status --short` solo lista los archivos del modulo nuevo (no toca Hub ni README raiz salvo en la fase de promocion posterior).
- `git diff --stat` sobre modulos estables vacio (no se rompen).

### Prueba en local
- Servir desde la raiz del repo:
  - `python -m http.server 8080`  o  `npx http-server -p 8080`
- Abrir: `http://localhost:8080/gesture-lab/<slug>/rubik-sota-<slug>-v<version>.html`
- Verificar visualmente: header, hero, selector, captura (con / sin HTTPS), comparacion, vista completa, PNG, video, share, guardado.

---

## Que NO debe contener la plantilla

- Textos sectoriales cerrados de otros modulos (Vecinia, Real Estate Immersive Viewer, etc.).
- Versiones reales (`v2.2.1`, `v2.3`, etc.) - solo placeholders `{{MODULE_VERSION}}`.
- Slugs reales (`rubik-sota-vecinia`, `rubik-sota-real-estate-immersive-viewer`, etc.).
- Librerias externas (MediaPipe, Three.js, etc.). Solo Google Fonts.
- Mojibake o caracteres rotos por encoding.
- IDs duplicados.
- Referencias `getElementById` sin elemento.

Si detectas cualquiera de estos puntos al usar la plantilla, primero corrige la plantilla en `gesture-lab/_module-template/` con una rama dedicada y luego clona en limpio para el modulo nuevo.

---

## Nota final

La plantilla es un punto de partida, no una verdad cerrada. Cada modulo puede divergir en su HTML / CSS / JS especifico, pero el contrato comun (header, hero, selector, captura, comparacion, vista completa, share, persistencia) debe respetarse para mantener coherencia en toda la familia Gesture Lab.
