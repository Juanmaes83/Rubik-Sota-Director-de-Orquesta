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
