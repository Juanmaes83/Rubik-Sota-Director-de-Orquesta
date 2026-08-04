# MIRRORA Finger Frame Portal

Status: v1.1 functional lightweight prototype inside Gesture Lab.

## What It Is

MIRRORA Finger Frame Portal turns a two-hand finger-frame gesture into a tracked commercial visual window. The user uploads a short base video, MediaPipe tracks both hands, and the module composites a customizable image/video inside the finger frame with brand, CTA, landing text and logo.

This is the first functional MIRRORA prototype connected from:

- `Juanmaes83/finger-frame-effect-ai`
- `Juanmaes83/blinkface`

## Integration Decision

Rubik Sota should not absorb heavy GPU engines into the core. Therefore this module integrates the lightweight, static-browser flow from `finger-frame-effect-ai` and documents `blinkface` as an external live/GPU engine candidate.

## User Flow

1. User reads consent and privacy copy.
2. User uploads a short video with the two-hand finger-frame gesture.
3. User optionally uploads portal content: destination video, hotel image, product, campaign asset or other commercial visual.
4. User optionally uploads a logo and edits headline, brand, CTA and landing URL.
5. User adjusts frame expansion, portal scale and portal X/Y offset.
6. User chooses:
   - local demo mode: custom portal content or hue-shift placeholder, no key, no remote upload;
   - Gemini mode: BYOK video-to-video restyle, remote generation by the provider.
7. MediaPipe tracks the finger frame.
8. The portal content appears only inside the tracked frame.
9. User previews and exports a local MP4/WebM when the browser supports recording.

## v1.1 Portal Composer

The module now acts as a commercial composer, not only a technical tracking demo:

- Base video input: the user makes the finger-frame gesture.
- Portal content input: image/video that appears inside the frame.
- Logo input: brand or destination logo rendered on the final canvas.
- Controls: frame expansion, content scale, content X/Y offset.
- Editable text: headline, brand/destination, CTA and landing URL.
- Export: final composed video with portal content and commercial overlay.

## Usage Guide

See `USAGE.md` for the practical testing guide: what video to record, how to test local demo mode, when to use Gemini, and why mobile QA should be done from GitHub Pages instead of desktop localhost.

## Privacy

- Camera is not activated by default in this module.
- User uploads a chosen video.
- Local demo mode does not send the video to a backend.
- Gemini mode sends the video to Google through the user's own API key.
- The module does not identify users, recognize identity, infer age, emotions, health or sensitive traits.
- No permanent storage is added by Rubik.

## Dependencies

- Browser APIs: File API, Canvas, MediaRecorder.
- MediaPipe Tasks Vision from CDN.
- Optional Gemini API call with user-provided key.
- No server is required for local demo mode.

## blinkface Relationship

`blinkface` is a stronger live-camera reference: it frames the face with both hands and restyles the region with a FLUX.2 backend. It requires a Python/FastAPI GPU server, proxy, token handling and HTTPS for remote camera access.

Rubik should treat `blinkface` as:

- external GPU/live engine;
- not GitHub Pages-only;
- not production-ready inside Rubik without security, privacy and cost review;
- future candidate for MIRRORA Live Viewfinder.

## Commercial Skins

- Retail campaign portal.
- Event souvenir portal.
- Tourism destination portal.
- Museum character portal.
- Fashion/editorial look portal.
- Premium real-estate host portal.

## Risks

- Gemini video generation is preview/API-dependent and can fail or change.
- Browser recording may output WebM instead of MP4.
- iOS/Safari support for MediaRecorder varies.
- Face/video input needs explicit consent and clear deletion/reset UX before production.
- The live `blinkface` path needs GPU, token and network security review.
