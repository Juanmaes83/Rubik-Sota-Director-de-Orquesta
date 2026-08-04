# MIRRORA Display / MUPI Live

Status: v1.1.1 local live-camera MUPI module with commercial personalization.

## What It Is

MIRRORA Display / MUPI Live is the live-screen version of the MIRRORA finger-frame idea. It is designed for digital windows, MUPIs, event screens and mobile campaign demos.

This module is cloned conceptually from `finger-frame-portal`, but adapted to public screens. It keeps a clean MUPI activation screen and adds an operator configuration layer:

- camera live view;
- two-hand finger-frame tracking;
- portal overlay in real time;
- custom image/video inside the hand portal;
- commercial presets;
- editable brand, kicker, headline, CTA and landing;
- editable campaign name for exported files;
- optional logo;
- persistent QR generated from the landing;
- portal scale, offset, expansion, glow and exterior dim controls;
- configurable recording duration: 6, 10, 15, 20 or 30 seconds;
- clear attract message: `Haz el marco con tus manos`;
- 16:9 and 9:16 display formats;
- automatic reset to attract mode;
- PNG capture and optional 6-second clip recording with the commercial composition included.

## Scope v1.1

This first version stays local/browser-only:

- Uses MediaPipe Tasks Vision from CDN.
- Processes the camera locally in the browser.
- Does not send video to a backend.
- Does not use Gemini/OpenAI/Kling/Higgsfield yet.
- Does not embed `blinkface` GPU backend yet.

## Operator Guide

1. Open the module from GitHub Pages on HTTPS when testing with mobile or a real display.
2. Press `Configurar campana`.
3. Choose a preset: tourism, retail, event or culture.
4. Edit brand, campaign name, label, main message, CTA and landing.
5. Upload a portal image/video. This is the content that appears inside the hand frame.
6. Upload a logo if the campaign needs one.
7. Choose clip duration. Default is 15 seconds because 6 seconds is usually too short for live positioning.
8. Adjust `Expandir marco`, `Escala portal`, `Mover X/Y`, `Realce portal` and `Oscurecer exterior`.
9. Use `Auto encajar` if the content is being cropped too aggressively.
10. Accept the camera permission and make the two-hand frame gesture.
11. Use `Captura PNG` or `Grabar 15s` to export the composed result.

Uploaded files stay local in the browser session. Text configuration persists in localStorage; media files should be reloaded after a page refresh.

Exports use campaign-safe names with timestamp, for example:

- `mirrora-destination-portal-20260804-135430.png`
- `mirrora-destination-portal-20260804-135430.webm`

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
- Open `Configurar campana` and verify presets update text and QR.
- Change `Nombre de campana` and confirm exported files use that name plus timestamp.
- Change recording duration and confirm the record button/status use the selected seconds.
- Upload a portal image/video and confirm it appears inside the gesture frame.
- Upload a logo and confirm it appears in the commercial overlay.
- Adjust scale/offset/expansion and confirm the portal stays readable.
- Make the two-hand finger-frame gesture.
- Confirm portal appears inside the frame.
- Confirm attract message returns after no gesture.
- Test 16:9 and 9:16 modes.
- Scan QR from another device.
- Test PNG capture with logo, QR, CTA and portal content.
- Test recording duration with the full commercial composition where supported by the browser.

## Known Limits

- Requires camera permission and secure context.
- Mobile browser MediaRecorder support varies.
- This is not yet a GPU/AI restyle module.
- Uploaded media is session-local and is not persisted after refresh.
