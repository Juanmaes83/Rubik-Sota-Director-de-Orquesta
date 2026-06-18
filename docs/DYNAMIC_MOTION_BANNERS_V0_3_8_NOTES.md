# Dynamic Motion Banners v0.3.8 Notes

## Scope

Universal Precision Controls for:

`gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-3.html`

No route, Hub, raw source, main branch or root README change is introduced.

## Problem

v0.3.7 fixed logo precision by writing visible controls directly to `visualLayoutState.logo`. The remaining blocks still had mixed control paths:

- main media frame was derived from a fixed `heroBox`
- image/video internal controls wrote to legacy `state.image`
- text, gallery, CTA, QR and logo were already in `visualLayoutState`, but mostly through range sliders

The result was not precise enough for creative layout work and could leave users adjusting controls that did not clearly represent real export pixels.

## Fix

v0.3.8 adds `visualLayoutState.media`:

- `x`
- `y`
- `width`
- `height`
- `scale`
- `offsetX`
- `offsetY`
- `opacity`
- `fitMode`
- `layerMode`

`drawCreative()` now uses `visualLayoutState.media` for the main image/video frame in editor, PNG, HTML, ZIP and WebM renders.

## Universal Stepper Pattern

The reusable numeric stepper pattern is applied to:

- media
- headline
- subheadline
- note
- gallery
- CTA
- QR

Logo precision from v0.3.7 remains intact.

Each control writes to `visualLayoutState`, activates manual mode and updates the sticky preview in real time.

## Layer Order

The render order remains fixed:

1. background
2. main media
3. logo
4. headline
5. subheadline
6. gallery
7. CTA
8. QR
9. note
10. editor-only guides

No layer-order controls are introduced in this phase.

## Export Guarantees

PNG, HTML, ZIP and WebM continue to use `createExportCanvasForPreset()` and `drawCreative()` with the active preset dimensions. Preview zoom and focus state are not serialized and do not affect export coordinates.

## Manifest

The ZIP manifest version is `0.3.8` and includes `visualLayout.media`, `visualLayout.logo`, all existing layout blocks and `layoutQa`.

## QA Focus

- Real-pixel media frame controls.
- Real-pixel text/gallery/CTA/QR controls.
- Logo precision regression check from v0.3.7.
- Sticky preview and zoom regression check from v0.3.6.
- WebM dimension regression check from 425129a.

## Follow-up v0.3.9

v0.3.9 builds on the same `visualLayoutState` model and adds vertical composition profiles, dedicated vertical bases and `conversionPanel` serialization. The universal precision controls remain the manual override path.
