# Dynamic Motion Banners v0.3.5 Notes

## Scope

Visual Control Studio Core for:

`gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-3.html`

No route, Hub, raw source or main branch change is introduced.

## Problem

Exports already respected format dimensions and WebM used a dedicated canvas, but compositions could still need manual art-direction: headline too large, subtitle too close to gallery, logo weak, CTA/QR imbalance or gallery pressure in dense formats.

## Shared Render Path

The editor preview, PNG, HTML, ZIP and WebM all render through `drawCreative()`. Export canvases are created by `createExportCanvasForPreset()` and force export mode, hiding guides and editor labels.

## visualLayoutState

`visualLayoutState` stores:

- version `0.3.5`
- composition preset and manual mode
- guide/safe-area/overlap flags
- headline, subheadline, note, gallery, CTA, QR and logo controls
- Layout QA status, warnings and errors in the manifest

## Controls

- Headline: x, y, font size, max width, line height, letter spacing, opacity.
- Subheadline: x, y, font size, max width, line height, opacity.
- Note: x, y, font size, opacity.
- Gallery: x, y, thumbnail width, thumbnail height, gap, opacity, layout mode.
- CTA: x, y, width, height, text size, opacity.
- QR: x, y, size, show URL, URL font size, URL offset.
- Logo: x, y, width, opacity, capsule enabled, capsule opacity.

## Composition Presets

- Auto editorial
- Texto compacto
- Galeria protagonista
- QR protagonista
- Minimal premium
- Manual

Changing a slider sets manual mode. Changing output format recalculates automatically only while manual mode is off; manual layouts scale proportionally.

## QA Logic

`getLayoutBoxes()` returns boxes for media, headline, subheadline, note, gallery, CTA, QR, QR URL and logo.

`detectLayoutIssues()` reports:

- QR too small or outside canvas
- headline or gallery fully outside canvas
- partial outside-canvas warnings
- headline/subheadline overlap
- gallery overlaps with subtitle, note, CTA or QR
- QR overlaps with CTA or text
- QR URL cut warning

Critical errors block export.

## JSON Layout

Copy layout JSON exports `visualLayoutState` without images, base64 or uploaded assets. Paste validates JSON and applies only recognized layout sections.

## Known Limitations

- No snapshots or localStorage in this phase.
- QR physical scan validation remains pending.

## Follow-up v0.3.6

The next microphase adds a sticky preview workspace and editor-only zoom controls. It keeps the v0.3.5 `visualLayoutState` render path intact and does not serialize preview zoom into the client manifest.
