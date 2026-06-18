# Dynamic Motion Banners v0.3.7 Notes

## Scope

Logo Precision Controls & Numeric Steppers for:

`gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-3.html`

No route, Hub, raw source, main branch or root README change is introduced.

## Problem

The editor had two logo control paths:

- the main `Capa de logo` panel adjusted legacy `state.logo.scale`, `state.logo.offsetX` and `state.logo.offsetY`
- the current export/editor composition uses `visualLayoutState.logo.x`, `visualLayoutState.logo.y` and `visualLayoutState.logo.width`

That meant the visible controls a user naturally tried first did not reliably move or resize the logo used by PNG, HTML, ZIP and WebM exports.

## Fix

The main logo panel now edits the exportable logo layout directly:

- `logo-precision-x`
- `logo-precision-y`
- `logo-precision-width`

Each control has `-10`, `-1`, editable numeric input, `+1` and `+10` actions. Values are clamped against the active preset and immediately switch the visual layout to manual mode.

## Coordinate Model

Logo coordinates are real preset pixels:

- `logo.x` is pixels from the left edge of the selected format
- `logo.y` is pixels from the top edge of the selected format
- `logo.width` is the rendered logo capsule width in pixels

Preview zoom, Fit mode and device pixel ratio do not change these values.

## Capsule

The capsule is drawn from the same `logoBox` as the image/text logo. When X, Y or width changes, the capsule moves and resizes with the logo. Capsule visibility and opacity are also exposed in the main logo panel.

## Layout QA

Logo-specific QA messages were added:

- `Logo parcialmente fuera del canvas.`
- `Logo fuera del canvas.`

Completely outside logo placement is treated as an error when the logo is visible and has opacity.

## Export Guarantees

PNG, HTML, ZIP and WebM continue to render through `drawCreative()` and use `visualLayoutState.logo` as the single source of truth. The ZIP manifest serializes `visualLayout.logo` with `x`, `y`, `width`, `opacity`, `capsuleEnabled` and `capsuleOpacity`.

## Deferred

The numeric stepper pattern was not extended to headline, gallery, CTA or QR in this phase to keep the fix focused on the logo issue.

## Follow-up v0.3.8

The next microphase extends the same numeric stepper pattern to media, headline, subheadline, note, gallery, CTA and QR. It also adds `visualLayoutState.media` so image/video frame controls use the same real-pixel source of truth as exports.
