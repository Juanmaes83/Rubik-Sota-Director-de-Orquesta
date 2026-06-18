# Dynamic Motion Banners v0.3.6 Notes

## Scope

Sticky Preview Workspace & Zoom Controls for:

`gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-3.html`

No route, Hub, raw source, main branch or root README change is introduced.

## Problem

v0.3.5 added manual visual controls, but editing was uncomfortable because the canvas dominated the page, controls required long scrolling, and the user could lose sight of the banner while adjusting sliders.

## Editor Workspace

- `.editor-workspace` uses a two-column layout on desktop.
- `.preview-column` keeps the banner visible on the left.
- `.controls-column` scrolls independently on the right.
- `.preview-frame` contains the WebGL canvas with local overflow for zoomed views.
- The global page avoids editor scroll as the primary editing mechanism.

## Preview Toolbar

The preview toolbar shows:

- active format
- real export size
- ratio
- Layout QA status
- Fit, 25%, 50%, 75%, 100% zoom buttons
- zoom slider from 10% to 150%
- Center
- Focus preview

The toolbar also states that preview zoom only affects the editor viewport and downloads keep the real format size.

## Zoom Model

`state.preview` stores editor-only view state:

- mode
- zoom
- fitScale
- focus

This state is not exported in `manifest/config.json` and is not part of `visualLayoutState`.

## Export Guarantees

PNG, HTML, ZIP and WebM continue to use:

- `activePreset.width`
- `activePreset.height`
- `visualLayoutState`
- `createExportCanvasForPreset()`
- `exportMode=true` for export renders

WebM still records from the dedicated export canvas, not from the editor viewport, preview toolbar or scroll position.

## QA Focus

- 1920x1080 horizontal Fit keeps the full banner visible.
- 1080x1920 vertical Fit keeps the vertical banner reviewable without invading controls.
- 100% zoom scrolls inside the preview frame instead of the whole page.
- ZIP and PNG after zoom keep real preset dimensions.
- WebM after zoom keeps real preset dimensions.

## Follow-up v0.3.7

The next microphase fixes logo precision controls. The sticky preview and zoom model remain editor-only; logo X/Y/width are controlled in real preset pixels through `visualLayoutState.logo`.
