# Dynamic Motion Banners v0.1

## Purpose

Standalone Gesture Lab module for interactive campaign banners, retail windows, fashion launches, events, real estate signs, and QR-based commercial pieces.

## Source

Raw source preserved at:

`effects/raw-sources/github/dynamic-motion-banner-webgl/index.html`

Original external source repo captured from:

`C:\Users\temp123\repos_external-sources\BANDEROLAS-DINAMICAS`

## Status

v0.1 standalone module.

Not connected to the Hub yet.

Not production ready.

## What changed

- Reframed the raw WebGL experiment as a premium commercial banner editor.
- Removed the original noir/police archive concept from the standalone module.
- Added Spanish campaign copy, commercial presets, QR placeholder, media upload, and PNG export.
- Preserved the core technical ideas: Canvas 2D dynamic texture generation, WebGL shaders, Verlet cloth/paper physics, mouse/touch interaction, image upload, video upload, and physical motion.
- Added WebGL fallback copy and responsive layout.

## Next steps

- Visual QA on desktop and mobile.
- Interaction QA for touch, drag, upload, video texture, and PNG export.
- Decide when to connect the module to `gesture-lab/index.html`.
- Prepare later production hardening only after v0.1 review.

## v0.2 - Media Layers, Logo, Recording & Audio

Dynamic Motion Banners v0.2 extends the standalone module without changing the current local route.

### Added

- Image controls for scale, X/Y position, opacity, fit mode, and reset.
- Independent logo layer with upload, size, X/Y position, opacity, visibility toggle, and reset.
- Separate state for main image, video, and logo layers so they do not replace each other.
- Media mode selector for image, video, or both.
- WebM recording of the WebGL canvas with `canvas.captureStream(30)` and `MediaRecorder` where supported.
- Presentation mode that hides the editor and lets the canvas occupy the full experience area.
- Audio playback support for local files and optional audio/radio URL playback.

### Known limitations

- WebM recording captures the visual WebGL banner only. Audio playback remains separate in this phase.
- Some radio/audio URLs can be blocked by CORS or browser autoplay/media policies.
- The module remains standalone and is not connected to the Hub yet.

## v0.3 - Exportable Preview Workflow

Dynamic Motion Banners v0.3 adds a separate HTML file:

`gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-3.html`

### Added

- Export HTML preview for client review.
- Export ZIP preview package with `index.html`, `manifest/config.json`, `README.txt` and available asset data.
- Configurable QR destination types: URL, phone call, WhatsApp and email.
- Redesigned logo zone with a stable premium plate and fit control.
- Optional lower gallery with 0, 1, 2 or 3 images.
- Audio controls extended with stop and mute.

### v0.3 limitations

- ZIP generation uses a local no-dependency ZIP writer with stored files, not compression.
- HTML preview is a static client review artifact based on the current rendered banner texture.
- WebM recording remains visual-only.
- Some real uploads/downloads cannot be fully validated inside the Codex in-app browser.

## v0.3.1 - Client Preview Export Polish

Same file as v0.3 (no version bump on disk). Polish for the export packages so they can be sent directly to a client.

### Added

- Campaign field (`#input-campaign`) separate from the headline.
- Real local QR code encoder (byte mode, ISO/IEC 18004, EC level L, versions 1..9). Replaces the previous placeholder pattern. Physical scan validation remains pending until tested with a real mobile reader.
- `generateClientPreviewDataUrl` / `generateClientPreviewBytes` central client preview generator reused by the PNG, HTML standalone and ZIP `assets/banner-preview.png` outputs so all three represent the same piece.
- `clientPreviewHtmlTemplate({ imageSrc })` client-only HTML template with centered piece (max 84vh, 92vw) and discrete metadata below. No internal tool labels in client output.
- Sanitized export naming: `dynamic-motion-banner-<brand>-<campaign>-preview.{png,html,zip,webm}`.
- ZIP preview package strict structure:
  - `index.html`
  - `README.txt` (client-facing language, no tooling terms)
  - `manifest/config.json` (clean schema, no data URLs, no localhost, no blobs)
  - `assets/banner-preview.png` (binary PNG, not a `.txt` data URL)
- Brand-safe logo capsule (`Soporte logo` control: translucent / light / dark / none). Default placement inside the cream content plate at the top-right, not in the outer dark band. Maximum width ~16.5% of texture.
- Removed the internal "DYNAMIC MOTION BANNERS v0.3" label that was previously drawn into the texture.

### v0.3.1 known limitations

- QR scan validation is pending. The QR matrix is generated from the ISO spec but has not been confirmed scannable with a physical mobile reader inside this session.
- ZIP writer remains stored mode (no DEFLATE). Banner PNG is the only large asset and is shipped uncompressed.
- WebM recording continues to capture the WebGL canvas only.

## v0.3.2 - Editor QR & Gallery Visibility Fix

Same file as v0.3 (no version bump on disk). Editor visibility fix for the QR action controls and the lower gallery.

### Added

- Dedicated `QR / ACCIÓN` editor section with QR type, destination, resolved final destination and validation status.
- Dedicated `GALERÍA INFERIOR 0–3 IMÁGENES` editor section with visible slot controls, thumbnails, filenames and remove actions.
- Gallery slot UI now mirrors the active count and uploaded image state before export.
- ZIP manifest continues to expose `qr.resolvedDestination`, `gallery.enabled` and `gallery.count`.

### v0.3.2 known limitations

- QR scan validation remains pending until tested with a physical mobile reader.
- WebM recording continues to capture the WebGL canvas only.

## v0.3.3 - Gallery Layout & Export Ratio QA

Same file as v0.3 (no route change). Production polish for export formats and gallery placement.

### Added

- `FORMATO / SALIDA` panel with presets for square preview, storefront, DOOH/MUPI, landing hero, panoramic banner, story/reel, vertical feed, square feed and custom dimensions.
- `EXPORT QA` panel showing expected size, expected ratio, actual generated size, actual ratio and status for PNG, HTML, ZIP and WebM.
- Dedicated export canvas for PNG, HTML, ZIP preview image and WebM recording so exports follow the selected preset dimensions.
- ZIP manifest version `0.3.3` with `preset` and `actualExport` metadata.
- Client README now reports selected format, output size, ratio, orientation and QR destination.
- Gallery layout now uses a reserved editorial strip with overlap checks against text, CTA, QR, note and logo zones.

### v0.3.3 known limitations

- QR scan validation remains pending until tested with a physical mobile reader.
- WebM metadata is reported from the dedicated recording canvas. External verification with ffprobe is still recommended before production delivery.

## v0.3.4 - WebM Export Canvas Dimensions Fix

Same file as v0.3 (no route change). Hardening pass for WebM export dimensions.

### Added

- `createExportCanvasForPreset()` creates an in-memory canvas with `width` and `height` set from the active preset only.
- `validateWebmCanvasDimensions()` cancels recording if the recording canvas does not match the active preset exactly.
- `WEBM QA` panel reports expected preset, expected size, expected ratio, actual recording canvas, actual ratio, duration and status.
- WebM filenames include the preset dimensions, for example `1080x1920`.
- Visible warning: WebM records from an export canvas, not from screen, viewport or scroll position.

### v0.3.4 known limitations

- Browser MediaRecorder metadata is still best verified externally with ffprobe before final production delivery.
- QR scan validation remains pending until tested with a physical mobile reader.

## v0.3.5 - Visual Control Studio Core

Same file as v0.3 (no route change). Adds the minimum manual art-direction controls needed to correct real compositions without editing code.

### Added

- `CONTROL VISUAL` panel with composition presets, manual sliders, guides, live Layout QA and lightweight layout JSON copy/paste.
- Shared `visualLayoutState` consumed by the editor preview, PNG, HTML, ZIP and WebM renders through the same `drawCreative()` path.
- Composition presets: Auto editorial, Texto compacto, Galeria protagonista, QR protagonista, Minimal premium and Manual.
- Manual controls for headline, subheadline, note, gallery, CTA, QR and logo.
- `fitTextToBox`, `getLayoutBoxes` and `detectLayoutIssues` for text fitting, bounding boxes and overlap warnings/errors.
- Manifest version `0.3.5` includes `visualLayout` and `layoutQa`.
- Client README includes composition preset and Layout QA status.

### v0.3.5 known limitations

- This phase intentionally avoids snapshots and localStorage.
- QR scan validation remains pending until tested with a physical mobile reader.

## v0.3.6 - Sticky Preview Workspace & Zoom Controls

Same file as v0.3 (no route change). UX polish for editing comfort in the visual control studio.

### Added

- Two-column editor workspace with sticky preview on the left and independently scrollable controls on the right.
- `preview-frame` around the WebGL canvas so the piece can fit inside the visible viewport without global page scroll.
- Preview toolbar with Fit, 25%, 50%, 75%, 100%, zoom slider, Center and Focus preview controls.
- Context chips for active format, real export size, ratio and Layout QA status.
- Sticky right-panel context header for format, composition preset, Layout QA and Export QA.
- Microcopy clarifying that preview zoom affects only the editor viewport, not downloads.

### Export guarantees

- Preview zoom is not written to the manifest.
- PNG, HTML, ZIP and WebM still use the active preset width/height and the shared `visualLayoutState`.
- WebM continues to record from the dedicated export canvas, not from the editor viewport or toolbar.

### v0.3.6 known limitations

- Focus preview expands the left workspace but keeps the control column available.
- QR scan validation remains pending until tested with a physical mobile reader.

## v0.3.7 - Logo Precision Controls & Numeric Steppers

Same file as v0.3 (no route change). Fixes logo control precision by aligning the visible logo panel with the exportable visual layout state.

### Added

- Numeric steppers for logo X, logo Y and logo width in real preset pixels.
- Fine controls: `-10`, `-1`, editable number, `+1`, `+10`.
- Dynamic clamps based on active format: X/Y allow off-canvas QA tests, width clamps from 20 px to `min(canvasWidth, 800)`.
- Main logo panel now writes directly to `visualLayoutState.logo`.
- Logo capsule enabled and capsule opacity controls are exposed in the main logo panel and stay synchronized with the visual controls panel.
- Layout QA now reports `Logo parcialmente fuera del canvas.` and `Logo fuera del canvas.`.

### Export guarantees

- Logo X/Y/width are real canvas coordinates and are serialized in `manifest/config.json` under `visualLayout.logo`.
- Preview zoom does not affect logo position or size.
- PNG, HTML, ZIP and WebM use the same `drawCreative()` and `visualLayoutState.logo` source as the editor preview.

### v0.3.7 known limitations

- Numeric steppers are limited to logo controls in this phase. Similar steppers for headline, gallery, CTA and QR can be evaluated in a later phase.
- QR scan validation remains pending until tested with a physical mobile reader.

## v0.3.8 - Universal Precision Controls

Same file as v0.3 (no route change). Extends real-pixel precision controls from logo to the main editable composition blocks.

### Added

- `visualLayoutState.media` as the exportable source of truth for the main image/video frame.
- Numeric steppers for media frame X/Y/width/height, internal scale and internal offsets.
- Numeric steppers for headline, subheadline, note, gallery, CTA and QR layout values.
- Shared stepper behavior: `-10`, `-1`, numeric input, `+1`, `+10`, with decimal deltas where relevant.
- Main media fit mode now writes to `visualLayoutState.media.fitMode`.
- Main media layer mode now writes to `visualLayoutState.media.layerMode`.
- ZIP manifest version `0.3.8` includes `visualLayout.media`.

### Export guarantees

- Editor preview, PNG, HTML, ZIP and WebM continue to render through `drawCreative()`.
- Preview zoom, focus state and panel scroll remain editor-only.
- Main media, text, gallery, CTA, QR and logo all use real preset coordinates, not CSS or viewport measurements.

### v0.3.8 known limitations

- Layer order remains fixed to preserve previous behavior.
- QR scan validation remains pending until tested with a physical mobile reader.

## v0.3.9 - Multi-Vertical Premium Composition Engine

Same file as v0.3 (no route change). Adds format-aware premium composition for vertical output families.

### Added

- Vertical composition profiles for 9:16, feed 4:5, MUPI print and custom vertical formats.
- Dedicated base layouts for 1080x1920, 1080x1350 and 1200x1760.
- 2160x3840 DOOH scales exactly 2x from the 1080x1920 vertical editorial base.
- New presets: Vertical Editorial Premium, Vertical QR Focus, Vertical Gallery Story, Vertical Minimal Luxury, Feed Vertical Premium and MUPI Print Premium.
- `visualLayoutState.conversionPanel` behind CTA and QR for premium vertical conversion blocks.
- Vertical gallery defaults to an ordered triptych row unless the Story preset explicitly uses `grid-2-1`.
- ZIP manifest version `0.3.9` includes `verticalProfile` and `conversionPanel`.

### Export guarantees

- Horizontal layouts keep the previous behavior and do not enable the vertical conversion panel by default.
- Vertical auto layouts use the correct profile when manual mode is off.
- Manual layouts are preserved when changing format; the editor exposes a recommended vertical preset button instead of overwriting user work.
- PNG, HTML, ZIP and WebM continue to render through `drawCreative()` and `createExportCanvasForPreset()`.

### v0.3.9 known limitations

- Conversion panel precision controls are serialized and rendered, but this phase does not add dedicated UI steppers for the panel itself.
- QR scan validation remains pending until tested with a physical mobile reader.

## Estado actual — v0.4 Hub Integration

- Versión estable del editor: v0.3.9.
- Tag estable: `dynamic-motion-banners-v0.3.9`.
- Integrado en Gesture Lab Hub: v0.4.
- Ruta del editor: `gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-3.html`.
- Exporta: PNG, HTML, ZIP y WebM.
- Formatos: horizontal, vertical 9:16, vertical 4:5, MUPI print y custom.
- Controles: media principal, texto, galería, CTA, QR y logo.
- QR configurable.
- Galería 0–3 imágenes.
- Preview sticky con zoom.
- Control preciso universal.
- Motor multi-vertical premium.
