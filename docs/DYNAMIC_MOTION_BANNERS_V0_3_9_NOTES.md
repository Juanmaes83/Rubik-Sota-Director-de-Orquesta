# Dynamic Motion Banners v0.3.9 Notes

## Scope

Multi-Vertical Premium Composition Engine for:

`gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-3.html`

No Hub, root README, raw source, main branch, push or merge change is introduced.

## Problem

The export engine supported several vertical formats, but the layout generator treated vertical work like a narrow adaptation of the horizontal composition. That left 9:16, feed 4:5 and MUPI print formats with weak hierarchy, broken gallery rhythm, floating CTA/QR placement and notes that did not feel anchored.

## Fix

v0.3.9 adds `getVerticalCompositionProfile(activePreset)` and dedicated vertical bases:

- `vertical-9-16` for 1080x1920, 2160x3840, MUPI digital vertical and Story/Reel.
- `vertical-feed-4-5` for 1080x1350.
- `vertical-print-mupi` for 1200x1760.
- `vertical-custom` for other vertical custom formats.

`scaleLayoutFromBase(baseLayout, targetWidth, targetHeight)` scales real layout values from each base. For 2160x3840, the 1080x1920 base is scaled exactly 2x.

## New Presets

- `vertical-editorial-premium`
- `vertical-qr-focus`
- `vertical-gallery-story`
- `vertical-minimal-luxury`
- `feed-vertical-premium`
- `mupi-print-premium`

Auto vertical behavior applies the profile-specific recommendation when the layout is not manual. Manual layouts are preserved and the editor exposes an apply-recommended button.

## Conversion Panel

`visualLayoutState.conversionPanel` is added:

- `enabled`
- `x`
- `y`
- `width`
- `height`
- `opacity`

The panel renders behind CTA and QR in editor, PNG, HTML, ZIP and WebM. Horizontal layouts keep it disabled by default.

## Gallery

Vertical editorial, feed and MUPI print profiles use ordered triptych rows by default. `grid-2-1` is reserved for `vertical-gallery-story`.

## Manifest

The ZIP manifest version is `0.3.9` and includes:

- `visualLayout.verticalProfile`
- `visualLayout.conversionPanel`
- all existing `visualLayout` blocks
- `layoutQa`

No preview zoom, panel scroll, base64 assets, blob URLs, local paths or localhost references are serialized into the client package.

## Regression Guarantees

- v0.3.8 universal precision controls remain the manual override path.
- v0.3.7 logo precision controls remain intact.
- v0.3.6 sticky preview and zoom remain editor-only.
- WebM continues to use `createExportCanvasForPreset()` and preset dimensions from 425129a.
