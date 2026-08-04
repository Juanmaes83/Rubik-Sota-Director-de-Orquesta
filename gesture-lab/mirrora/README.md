# MIRRORA

Status: R&D foundation plus MIRRORA Finger Frame Portal v1.2 campaign prototype.

Tagline: Your face becomes the experience.

Spanish tagline: Tu rostro se convierte en la experiencia.

## Objective

MIRRORA is the independent Gesture Lab block for face identity experiences: face capture or upload, visual identity, try-on, avatar storytelling, branded souvenir and conversion modules built around the user's own visual presence.

## Difference From ZOLTAN

MIRRORA is not ZOLTAN.

ZOLTAN is magic, mentalism, oracle logic, reveal and reward.

MIRRORA is face identity, visual self-representation, try-on, avatar, souvenir and brand personalization.

The two blocks may share safe Gesture Lab primitives, but MIRRORA must not modify or depend on ZOLTAN modules.

## Future Module Ideas

- MIRRORA Face Souvenir.
- MIRRORA Beauty Mirror.
- MIRRORA Lipstick Try-On.
- MIRRORA Optic Fit.
- MIRRORA Headwear Studio.
- MIRRORA Hair Identity Lab.
- MIRRORA StoryFace Portal.
- MIRRORA Retail VIP Pass.

## Functional Prototype

- MIRRORA Finger Frame Portal: `finger-frame-portal/`.
- Based on `Juanmaes83/finger-frame-effect-ai` as lightweight browser module.
- Uses MediaPipe hand tracking, uploaded video, local demo compositing, presets, QR, 16:9/9:16 formats, showcase view, final conversion screen and optional Gemini BYOK restyle.
- Documents `Juanmaes83/blinkface` as external GPU/live engine candidate, not embedded runtime.

## Strategy Documents

- `../../docs/MIRRORA_FINGER_FRAME_COMMERCIAL_STRATEGY.md`
- `../../docs/MODULAR_IMPLEMENTATION_METHOD.md`
- `../../docs/MIRRORA_PROVIDER_ARCHITECTURE.md`

## Current Phase

Foundation plus commercial prototype:

- Documentation.
- R&D map.
- Privacy and safety limits.
- Application map.
- Finger Frame Portal v1.2 campaign prototype.
- No Face Anything implementation.
- No Rubik backend.
- No dependencies.
- No model files.

## Next Steps

1. Validate v1.2 on GitHub Pages from mobile.
2. Check QR readability, 16:9/9:16 exports and final conversion screen.
3. Decide whether the next module is MIRRORA Display / MUPI Live.
4. Review blinkface-style live camera requirements: HTTPS, consent, GPU/backend, token handling and cost.
5. Prototype one provider path only after mobile QA passes.
