# Rubik Repo Ecosystem Audit

Status: ecosystem audit for Rubik Sota Director de Orquesta.

Purpose: keep order across repos, forks, engines, references and commercial modules. This document does not start implementation. It defines what each source can contribute and where it belongs inside Rubik.

## Operating rule

Rubik is the orchestrator. A repo becomes visible in the public catalog only when it helps a user understand a commercial family. Technical engines and external forks stay in family READMEs until a future module needs local runtime files.

## Already integrated or documented

- Rubik Sota Director de Orquesta: global brain and public catalog.
- MIRRORA Finger Frame Portal: stable uploaded-video portal composer.
- MIRRORA Display / MUPI Live: stable live-camera display/MUPI portal.
- Fashion Studio SOL: advanced external Fashion module, linked from Moda.
- Living Maps 3D: La Batuta, Living Map and Maqueta Viva 3D, linked as a family.
- Camera FX Cum Laude: 7 webcam experiences, connected as independent family.
- ZOLTAN: reveal/reward family with Oracle, Magic Square, Portal 1089 and sector skins.

## New ecosystem families

### Gesture Retail Commerce

Primary value: conversion.

Best sources:

- Virtual-Shopping-Cart-OPENCV;
- Retail Window Pro;
- Interactive Gesture Catalog;
- Interactive Retail Window;
- NonMouse as optional interaction support.

Why it matters:

- strongest fit for storefronts, MUPIs, shopping centers, fairs and retail campaigns;
- can reuse Rubik patterns already validated: logo, products, CTA, QR, wishlist, mobile continuity and export;
- should be the first new commercial module to develop.

Status: v1 QA module created in `gesture-lab/gesture-retail-commerce/rubik-sota-gesture-retail-commerce-v1.html`.

### Gesture FX / Visual Shows

Primary value: attention.

Best sources:

- hand-gesture-particle-effects;
- webcam-audio-visualizer;
- SwordArt;
- Camera FX Cum Laude.

Why it matters:

- fast visual impact for events, beauty, fashion, music, tourism and launches;
- easy to personalize with brand colors, particles, logo, campaign claim, QR and 9:16/16:9 modes;
- should follow Retail Commerce because it is visually powerful and faster to package.

Status: family documented, module not implemented yet.

### Gesture Gaming Arena

Primary value: participation.

Best sources:

- Hand-Gesture-Gaming;
- Real-Time-Hand-Gesture-Control-System-for-Racing-Games;
- Hand-Gesture-Controlled-Game;
- hand-gesture-game-controller;
- Starter-Kit-Racing2;
- gesture-cube.

Why it matters:

- strong for events, automotive, education, retail activations and brand challenges;
- can become short challenge formats with timer, score, reward, QR and share output;
- needs more QA than FX because gameplay, latency and fairness matter.

Status: family documented, later implementation.

### Gesture Interface Core

Primary value: shared control layer.

Best sources:

- NonMouse;
- hand-gesture-recognition-mediapipe;
- Real-time-hand-gesture-recognition;
- OpenCV-Hand-Gesture-Control;
- Gesture-Recognition;
- human.

Why it matters:

- should not be sold as a standalone module first;
- can standardize gestures across maps, retail, games, MUPIs and dashboards;
- should define privacy, calibration, fallback, confidence and gesture vocabulary.

Status: family documented, transversal engine layer.

## References to keep but not promote as modules

- map3d: 3D city/building ideas for Maqueta Viva and Living Maps 3D.
- maptalks.js: advanced 2D/3D map engine reference.
- openfreemap: open map infrastructure and provider fallback.
- prettymaps/maptoposter: visual map souvenirs, route cards and campaign outputs.
- lingbot-map: heavy 3D reconstruction R&D.
- 8thwall: AR/mobile spatial reference.
- Leaflet, mapbox-gl-js, mapbox-gl-native: map infrastructure references.
- GSAP-Awwwards-Website, award-winning-website, gsap-collection, react-bits: visual/UI inspiration.
- unity-mcp, Unreal_mcp, unity-visualscripting-samples: future 3D/game-dev automation references.
- ESP32/tello/hardware repos: future hardware experiments, not current web/MUPI focus.

## Solapamientos

- Cursor control: NonMouse is the main reference; similar virtual mouse repos are secondary.
- Gesture recognition: hand-gesture-recognition-mediapipe is the main technical reference; OpenCV/Python repos are backups.
- Racing/game control: Real-Time Racing is the strongest control source; smaller game-controller repos are supporting references.
- Map engines: use the family README to choose provider per project; do not expose every map engine in the public UX.

## Current recommendation

1. Keep the public catalog family-based.
2. QA next: Gesture Retail Commerce v1 on desktop, mobile, QR scan and webcam.
3. Then package Gesture FX / Visual Shows.
4. Then validate Gesture Gaming Arena.
5. Use Gesture Interface Core as a shared internal layer, not as a standalone public product.
