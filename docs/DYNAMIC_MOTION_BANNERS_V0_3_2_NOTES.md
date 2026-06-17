# Dynamic Motion Banners v0.3.2 Notes

## Scope

Editor QR and gallery visibility fix for:

`gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-3.html`

No route or version bump is introduced in this pass.

## Changes

- Added a visible `QR / ACCIÓN` section in the editor with QR type, QR destination, resolved final destination and status copy.
- Added a visible `GALERÍA INFERIOR 0–3 IMÁGENES` section with activation, image count, three explicit image slots, upload controls, filenames, thumbnails and remove controls.
- Synced gallery slot UI with the active gallery count and loaded file state.
- Kept the ZIP preview package structure unchanged:
  - `index.html`
  - `README.txt`
  - `manifest/config.json`
  - `assets/banner-preview.png`
- Kept manifest fields required for client review:
  - `qr.resolvedDestination`
  - `gallery.enabled`
  - `gallery.count`

## QA Scope

Required local QA for this pass:

- Editor loads without page errors.
- QR section is visible and resolves the final destination.
- Gallery section is visible and exposes all 3 slots.
- Three test gallery images can be uploaded and rendered in the piece.
- ZIP export opens as a standalone preview using `assets/banner-preview.png`.
- Exported ZIP does not contain localhost, blob URLs or local Windows paths.

## Known Limitations

- QR physical scan validation is still pending. This pass validates the editor state, generated QR payload and exported manifest, not real mobile scanning.
- WebM recording remains visual-only.
