# MIRRORA Platform Brief

Status: R&D foundation. No functional implementation yet.

## Definition

MIRRORA is the Gesture Lab block for personalized visual identity experiences. Its purpose is to turn a user's face or face-derived visual asset into an interactive experience: try-on, avatar, visual souvenir, narrative identity, brand reward or conversion module.

Official tagline: Your face becomes the experience.

Spanish tagline: Tu rostro se convierte en la experiencia.

## What MIRRORA Is

- A visual identity experience platform.
- A research line for face-based creative modules.
- A future base for try-on, avatars, face souvenirs and branded personal storytelling.
- A modular block inside Gesture Lab / Director de Orquesta.
- A privacy-by-design area where face data must remain local or explicitly consented.

## What MIRRORA Is Not

- It is not ZOLTAN.
- It is not magic, mentalism or oracle-based reveal.
- It is not biometric identification.
- It is not face recognition.
- It is not medical diagnosis.
- It is not age, emotion or sensitive-attribute inference.
- It is not a production promise.
- It is not approved for commercial deployment until licensing, privacy, model architecture and operational risk are reviewed.

## Difference From ZOLTAN

ZOLTAN is the Gesture Lab line for magic, mentalism, selection, reveal, ritual and reward. It uses surprise, binary selection, card logic, numbers and symbolic staging.

MIRRORA is the Gesture Lab line for identity, face capture, visual self-representation, try-on, avatar and souvenir. The user does not merely choose a hidden option; the user's own visual identity becomes the material of the experience.

The two lines can share Gesture Lab foundations such as static GitHub Pages hosting, local asset intake, touch fallback, privacy copy, modular folders and downloadable PNG outputs. They must not share brand semantics, module names or hidden state.

## Objective

Create a foundation so any developer or AI agent understands:

- MIRRORA's purpose.
- Its separation from ZOLTAN.
- The technologies to investigate.
- The already validated project primitives to reuse.
- Priority sectors.
- Application concepts.
- Privacy and legal limits.
- The roadmap before implementation.

## Priority Audiences

- Retail innovation teams.
- Beauty and cosmetics brands.
- Optical shops and eyewear brands.
- Fashion and headwear brands.
- Hair salons and barber shops.
- Museums and tourism operators.
- Events and brand activation teams.
- Premium real estate and hospitality.
- Education and cultural storytelling teams.

## Priority Sectors

- Beauty.
- Cosmetics.
- Optics.
- Fashion.
- Hair and barber.
- Headwear.
- Perfume.
- Non-medical wellness.
- Non-diagnostic health education.
- Retail.
- Events.
- Museums.
- Tourism.
- Education.
- Automotive.
- Premium real estate.

## Application Families

1. Try-on visual: lipstick, makeup, glasses, sunglasses, caps, hats, hair, beard and accessories.
2. Avatar and storytelling: user as narrator, mascot, character, museum guide or brand host.
3. Souvenir and reward: portrait, point cloud, poster, pass, card or short video.
4. Commerce and conversion: wishlist, appointment, demo request, save look, share souvenir.

## New Technologies To Investigate

Primary R&D reference:

- Face Anything: https://github.com/kocasariumut/FaceAnything
- Project page: https://kocasariumut.github.io/FaceAnything/
- Hugging Face Space: https://huggingface.co/spaces/UmutKocasari/FaceAnything
- Paper: https://arxiv.org/abs/2604.19702

Face Anything is documented as an R&D candidate for 4D facial reconstruction, dense tracking, depth, normals, canonical facial maps, point clouds, PLY outputs and videos. It is not a browser-ready dependency and must not be integrated until license, privacy and compute risks are resolved.

## Validated Project Capabilities To Reuse

- Gesture Lab as a modular experimental container.
- Static GitHub Pages compatible folders.
- Local asset intake.
- Touch fallback.
- Optional webcam runtime only after audit confirms suitability.
- Reward / PNG download where useful.
- Privacy-visible UX.
- Modular HTML/CSS/JS without heavy framework.
- Possible Three.js / 3D viewer if already supported without architecture breakage.

## Risks

- Commercial license risk, especially for non-commercial model licenses.
- GPU and CUDA requirements for advanced reconstruction.
- Face data privacy, consent and retention.
- User expectation risk if the experience implies identification or diagnosis.
- Mobile performance constraints.
- Browser camera limitations.
- Asset weight and export size.
- Misuse in sensitive sectors.
- Legal requirements for minors and biometric-like data.

## Initial Roadmap

### Phase 0 - Foundation Docs

Create documentation, application map, privacy limits and R&D direction.

### Phase 1 - Offline Face Output Compatibility Test

Process outputs outside the repo and test whether `pointcloud.mp4`, `grand_tour.mp4`, PLY, depth, canonical maps and tracks can be viewed as assets in Gesture Lab.

### Phase 2 - MIRRORA Face Souvenir Prototype

First transversal module: user uploads or captures a face, sees a preprocessed identity visual, and downloads a souvenir/reward.

### Phase 3 - MIRRORA Optic Fit / Beauty Mirror

First conversion vertical: glasses, lipstick, makeup or headwear.

### Phase 4 - MIRRORA StoryFace Portal

Avatar/narrator module with a predefined story and consent-first interaction.

## Success Criteria

- MIRRORA remains clearly separated from ZOLTAN.
- No Face Anything implementation is added in this phase.
- No dependencies or backend are added.
- All documents define privacy and legal limits.
- Future agents can understand the block from the repo alone.
- The first prototype can be planned without touching validated ZOLTAN modules.
