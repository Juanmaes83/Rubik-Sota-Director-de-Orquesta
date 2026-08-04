# MIRRORA

Status: R&D foundation plus first lightweight prototype.

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
- Uses MediaPipe hand tracking, uploaded video, local demo compositing and optional Gemini BYOK restyle.
- Documents `Juanmaes83/blinkface` as external GPU/live engine candidate, not embedded runtime.

## Strategy Documents

- `../../docs/MIRRORA_FINGER_FRAME_COMMERCIAL_STRATEGY.md`
- `../../docs/MODULAR_IMPLEMENTATION_METHOD.md`

## Current Phase

Foundation plus prototype:

- Documentation.
- R&D map.
- Privacy and safety limits.
- Application map.
- Finger Frame Portal prototype.
- No Face Anything implementation.
- No Rubik backend.
- No dependencies.
- No model files.

## Next Steps

1. Review documentation.
2. Run offline compatibility tests with preprocessed outputs.
3. Build a viewer-only Face Souvenir prototype using static assets.
4. Validate privacy copy and mobile behavior.
5. Only then evaluate try-on or avatar modules.
