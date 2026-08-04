# MIRRORA Display / MUPI Live

Status: v1.0 local live-camera module for Gesture Lab.

## What It Is

MIRRORA Display / MUPI Live is the live-screen version of the MIRRORA finger-frame idea. It is designed for digital windows, MUPIs, event screens and mobile campaign demos.

This module is cloned conceptually from `finger-frame-portal`, but it is not an editor. It is a clean activation screen:

- camera live view;
- two-hand finger-frame tracking;
- portal overlay in real time;
- persistent QR;
- clear attract message: `Haz el marco con tus manos`;
- 16:9 and 9:16 display formats;
- automatic reset to attract mode;
- optional PNG capture and 6-second clip recording.

## Scope v1.0

This first version stays local/browser-only:

- Uses MediaPipe Tasks Vision from CDN.
- Processes the camera locally in the browser.
- Does not send video to a backend.
- Does not use Gemini/OpenAI/Kling/Higgsfield yet.
- Does not embed `blinkface` GPU backend yet.

## Why Not blinkface Yet

`blinkface` is relevant for a future MIRRORA live GPU engine, but it requires:

- backend hosting;
- GPU inference;
- token handling;
- HTTPS and camera permissions;
- provider cost control;
- stricter privacy review.

Therefore v1.0 uses local MediaPipe and canvas only.

## Provider Architecture

The future provider layer should follow `docs/MIRRORA_PROVIDER_ARCHITECTURE.md`:

- `local`: default browser-only mode;
- `gemini`: optional BYOK restyle/generation;
- `openai`: future campaign assets/copy/visual generation;
- `kling`: future video generation;
- `higgsfield`: future social/creative video generation;
- `mcp`: orchestration and connectors.

## QA Checklist

- Open from GitHub Pages over HTTPS on mobile.
- Accept camera permission.
- Confirm live camera appears.
- Make the two-hand finger-frame gesture.
- Confirm portal appears inside the frame.
- Confirm attract message returns after no gesture.
- Test 16:9 and 9:16 modes.
- Scan QR from another device.
- Test PNG capture.
- Test 6-second recording where supported by the browser.

## Known Limits

- Requires camera permission and secure context.
- Mobile browser MediaRecorder support varies.
- This is not yet a GPU/AI restyle module.
- The portal content is local demo art in v1.0.
