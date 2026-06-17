# Dynamic Motion Banners v0.3.4 Notes

## Scope

WebM export canvas dimensions fix for:

`gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-3.html`

No route, Hub or main branch change is introduced.

## Problem

A manually exported WebM reported `2153 x 4443`, with a very tall ratio and large external black area. Those dimensions are consistent with recording a visible canvas sized from editor layout (`getBoundingClientRect()` multiplied by `devicePixelRatio`) instead of a production export canvas. The visible WebGL canvas is allowed to use viewport and DPR for interactive display, but WebM export must not.

## Fix

- Added `createExportCanvasForPreset()`.
- Added `validateWebmCanvasDimensions()`.
- WebM recording now uses a fresh in-memory canvas whose `width` and `height` are exactly the active preset.
- Recording is cancelled before download if the recording canvas dimensions do not match the preset.
- WebM filename includes the active preset dimensions.
- Added a visible `WEBM QA` panel with expected preset, expected size, expected ratio, actual recording canvas size, actual ratio, duration and state.

## Guarantees

- No `window.innerWidth` or `window.innerHeight` is used for WebM export dimensions.
- No `clientWidth`, `clientHeight`, `getBoundingClientRect()`, `scrollHeight`, `offsetHeight` or `devicePixelRatio` is used for WebM export dimensions.
- `captureStream()` is called on the dedicated export canvas, not the visible editor canvas.
- The recording canvas is redrawn every animation frame without changing its dimensions.

## QA Cases

- Escaparate vertical / DOOH: expected WebM canvas `1080 x 1920`, ratio `9:16`.
- Escaparate horizontal: expected WebM canvas `1920 x 1080`, ratio `16:9`.
- Feed vertical: expected WebM canvas `1080 x 1350`, ratio `4:5`.

## External Verification

Use ffprobe when available:

`ffprobe -v error -show_entries stream=width,height -of json archivo.webm`

Browser QA still reports the actual recording canvas size even when blob metadata is not read directly.
