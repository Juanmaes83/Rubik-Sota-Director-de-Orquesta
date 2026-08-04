# Gesture Interface Core

Status: transversal family index, not a commercial module.

Goal: define the shared gesture-control layer that can support maps, retail, games, MUPIs, dashboards and accessibility-style interactions.

## Why this family matters

Rubik needs a common language for gesture UX:

- consistent gestures across modules;
- privacy and consent rules;
- calibration;
- confidence and status feedback;
- no-camera fallback;
- mobile and kiosk QA.

## Source repos and modules

- `https://github.com/Juanmaes83/NonMouse` - main virtual mouse/control reference.
- `https://github.com/Juanmaes83/hand-gesture-recognition-mediapipe` - main hand gesture recognition reference.
- `https://github.com/Juanmaes83/Real-time-hand-gesture-recognition` - gesture classification reference.
- `https://github.com/Juanmaes83/OpenCV-Hand-Gesture-Control` - Python/OpenCV control reference.
- `https://github.com/Juanmaes83/Gesture-Recognition` - lightweight gesture/keyboard reference.
- `https://github.com/Juanmaes83/human` - heavy browser vision reference.

## Recommended gesture vocabulary

- open palm: activate / wake;
- pinch: select;
- fist: confirm / hold;
- swipe left-right: browse;
- two hands: zoom / expand;
- hand lost: pause / reset timer;
- button fallback: always available.

## Target modules

- Gesture Retail Commerce;
- Living Maps 3D;
- Gesture Gaming Arena;
- Gesture FX / Visual Shows;
- MIRRORA Display / MUPI Live;
- Camera FX Cum Laude.

## What not to do yet

- Do not sell this as a public module.
- Do not force one engine into every module before QA.
- Do not remove local/manual fallback.

## Next decision

Use this README as the contract for future gesture modules. Implement only the subset needed by the next commercial module.
