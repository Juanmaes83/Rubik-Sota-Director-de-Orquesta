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
