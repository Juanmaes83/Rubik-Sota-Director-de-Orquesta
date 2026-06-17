# Dynamic Motion Banners v0.3.3 Notes

## Scope

Gallery layout and export ratio QA for:

`gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-3.html`

No route, Hub or versioned module path change is introduced.

## Problem

The v0.3.2 editor exposed QR and gallery controls, but the lower gallery could visually compete with secondary copy, CTA and QR. Exports also did not communicate final size, ratio or target format clearly enough for storefront, MUPI, DOOH, landing, banner or social deliverables.

## Changes

- Added `FORMATO / SALIDA` with production presets and custom dimensions.
- Added visible output metadata: active preset, final width, final height, ratio and orientation.
- Added `EXPORT QA` with expected size, expected ratio, real generated size, real ratio and status.
- Added `getAspectRatioLabel(width, height)` and `validateExportDimensions(expectedWidth, expectedHeight, actualWidth, actualHeight)`.
- Added dedicated export rendering for PNG, HTML, ZIP preview image and WebM.
- Updated ZIP manifest to version `0.3.3` with `preset` and `actualExport` metadata.
- Updated client README content with format, output size, ratio, orientation and QR validation note.
- Reserved an editorial gallery strip and added bounding-box overlap checks against text, note, CTA and QR zones.

## Presets

- Cuadrado preview: 1024 x 1024, 1:1.
- Escaparate horizontal: 1920 x 1080, 16:9.
- Escaparate horizontal 4K: 3840 x 2160, 16:9.
- Escaparate vertical / DOOH: 1080 x 1920, 9:16.
- Escaparate vertical / DOOH 4K: 2160 x 3840, 9:16.
- MUPI digital vertical: 1080 x 1920, 9:16.
- MUPI print preview: 1200 x 1760, 15:22. Preview only; confirm final artwork with provider.
- Ordenador / landing hero: 1920 x 1080, 16:9.
- Banner web panoramico: 1920 x 640, 3:1.
- Story / Reel movil: 1080 x 1920, 9:16.
- Feed vertical: 1080 x 1350, 4:5.
- Feed cuadrado: 1080 x 1080, 1:1.
- Custom: manual width and height between 320 and 4096 px.

## Gallery Layout

The gallery is placed below the main text block, aligned left or center-left depending on available width, before the CTA/QR block. The renderer computes boxes for hero media, headline text, subtitle, lower note, gallery, CTA, QR and logo. If the gallery intersects reserved copy or QR zones, it is moved or reduced before drawing.

Editor mode may show a discreet gallery guide. Client export mode does not draw editor labels or placeholders unless real gallery images are present.

## QA Scope

Required QA for this pass:

- 1920 x 1080 ZIP export with QR and gallery enabled.
- 1080 x 1920 PNG/HTML export.
- 1080 x 1350 PNG export.
- WebM capture from the dedicated export canvas, not the editor viewport.
- Manifest version `0.3.3`, preset metadata and actual export metadata.
- ZIP contains only `index.html`, `README.txt`, `manifest/config.json`, `assets/banner-preview.png`.

## Known Limitations

- QR physical scan validation is still pending.
- WebM dimensions are reported from the canvas used for recording. Production teams should verify final files with ffprobe before publishing.
