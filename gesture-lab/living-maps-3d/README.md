# Living Maps 3D - Rubik Sota Director de Orquesta

Status: family index inside Gesture Lab.

Living Maps 3D is the territorial family of Rubik Sota Director de Orquesta: living maps, gesture maps, 3D city models, POIs, routes, rewards, QR continuity, digital storefronts and mobile follow-up.

This folder does not copy external engines. Rubik exposes, orders and documents the family. The runtime code stays in the original repositories until a future integration explicitly needs local files.

---

## Role inside Rubik

Director de Orquesta remains the global brain.

Living Maps 3D is one family beside MIRRORA, Fashion, ZOLTAN, Camera FX and the core Gesture Lab modules.

Current focus:

- first vertical: tourism;
- future verticals: real estate, retail, culture, events, education, smart city, museums, digital storefronts and MUPIs;
- current validation: keep La Batuta and Maqueta Viva 3D visible in parallel until QA proves which one is the stronger flagship.

---

## Commercial modules visible from Rubik

### LM1 - La Batuta de Torrevieja

Public demo:
https://juanmaes83.github.io/map-gesture-controls/demo/batuta-torrevieja.html

Source:
https://github.com/Juanmaes83/map-gesture-controls/tree/main/examples/batuta-torrevieja

README:
https://github.com/Juanmaes83/map-gesture-controls/blob/main/examples/batuta-torrevieja/README.md

Product reading:

- premium narrative map experience;
- "the city responds to your hands";
- tutorial, privacy, HUD, POI unlocks, microstories, reward card and share/download flow;
- strongest candidate for a tourism, city, museum, event or interactive window sales story;
- should be validated on mobile and kiosk/display before calling it stable.

Status:

- functional external demo;
- tourism-first;
- needs QA for webcam gestures in real mobile/kiosk conditions;
- QR continuity, analytics and richer media can be improved in later phases.

### LM2 - Maqueta Viva 3D Torrevieja

Public demo:
https://juanmaes83.github.io/little-big-city/maqueta-viva-torrevieja.html

Source:
https://github.com/Juanmaes83/little-big-city

README:
https://github.com/Juanmaes83/little-big-city/blob/gh-pages/README.md

Product reading:

- 3D territorial prototype;
- city model with zones, POIs, routes, sectors, public data hooks, media placeholders, local analytics and presentation mode;
- strongest candidate for institutional, real estate, smart city and premium territorial presentations;
- prepared for gesture input by contract, but not a finished live webcam gesture module yet.

Status:

- public 3D demo exists;
- default branch is `gh-pages`;
- gesture-ready, not fully live-camera controlled;
- useful as a flagship 3D territorial experience, but needs technical QA before claiming gesture-live stability.

### LM3 - Living Map Experience

Public demo:
https://juanmaes83.github.io/map-gesture-controls/demo/living-map.html

Source:
https://github.com/Juanmaes83/map-gesture-controls/tree/main/examples/living-map

README:
https://github.com/Juanmaes83/map-gesture-controls/blob/main/examples/living-map/README.md

Config:
https://github.com/Juanmaes83/map-gesture-controls/blob/main/examples/living-map/living-map.config.json

Product reading:

- configurable living map product;
- JSON-based brand, map, POIs, unlocks, reward, CTA, WhatsApp/share and kiosk mode;
- useful as the scalable product layer for multiple cities, campaigns and sectors;
- less cinematic than La Batuta, but easier to adapt as a configurable commercial template.

Status:

- functional v0.1 tourism demo;
- prepared for sector config;
- pending real QR continuity, analytics, richer assets and second-sector validation.

---

## Engines and primary repositories

### map-gesture-controls

Repo:
https://github.com/Juanmaes83/map-gesture-controls

Role:

- main gesture map engine;
- webcam/hand gesture map control;
- supports OpenLayers, Google Maps and Leaflet directionally;
- privacy-first camera flow and fallback without camera;
- source for Living Map and La Batuta.

### little-big-city

Repo:
https://github.com/Juanmaes83/little-big-city

Role:

- 3D city/territory experience;
- Maqueta Viva 3D Torrevieja public prototype;
- prepared to receive gesture/navigation intents;
- not copied into Rubik.

---

## Technical references and R&D sources

These references should be documented as ecosystem sources, not promoted as finished Rubik modules unless a future phase packages them.

### map3d

Repo:
https://github.com/Juanmaes83/map3d

Possible role:

- 3D building mapping;
- OSM/building data;
- export and 3D city visualization ideas.

Status: technical reference / possible future engine.

### maptalks.js

Repo:
https://github.com/Juanmaes83/maptalks.js

Possible role:

- WebGL/WebGPU map rendering reference;
- advanced browser map engine ideas.

Status: external engine/reference.

### openfreemap

Repo:
https://github.com/Juanmaes83/openfreemap

Possible role:

- open map tiles and self-hosted/free map stack options;
- useful if paid map providers become a cost or privacy constraint.

Status: infrastructure/reference.

### prettymaps / maptoposter

Related repo:
https://github.com/Juanmaes83/maptoposter

Possible role:

- visual/poster map outputs;
- souvenir cards, printed campaigns, tourism posters and branded route artifacts.

Status: visual output/reference.

### lingbot-map

Repo:
https://github.com/Juanmaes83/lingbot-map

Possible role:

- advanced 3D reconstruction / streaming research;
- future heavy R&D, not front-end-only.

Status: R&D reference, likely backend/GPU dependent.

### 8thwall

Repo:
https://github.com/Juanmaes83/8thwall

Possible role:

- AR/location-based interaction research;
- possible bridge for city, tourism and retail AR activations.

Status: external AR reference.

### human

Repo:
https://github.com/Juanmaes83/human

Possible role:

- vision/pose/face/hand engine reference;
- useful for future gesture, presence or identity layers.

Status: heavy vision engine/reference, not embedded in Living Maps 3D yet.

---

## Current integration rule

Do:

- link public demos from Rubik;
- keep README and status clear;
- preserve original external repositories;
- mark what is live, gesture-ready, R&D or future;
- test public URLs from mobile before calling a module stable.

Do not:

- copy external repos into Rubik without a clear integration reason;
- present gesture-ready 3D as finished live webcam control;
- create many duplicate modules when one configurable family page is enough;
- hide technical engines in the main public UX.

---

## QA checklist before promoting a flagship

Use this checklist for La Batuta, Maqueta Viva 3D and Living Map:

- Public URL opens on mobile over HTTPS.
- Camera permission flow is clear when webcam is used.
- There is a no-camera fallback.
- Main action is understandable in less than 5 seconds.
- CTA, QR or share flow is visible and usable.
- The experience has a clear sector use case.
- Performance is acceptable on a normal mobile.
- The README says honestly what works and what is pending.

---

## Recommended next decision

Keep all three visible now:

- La Batuta: best emotional tourism story.
- Maqueta Viva 3D: best premium territorial/3D story.
- Living Map: best configurable product template.

After mobile QA, choose one as the public flagship for Living Maps 3D and keep the other two as complementary demos or roadmap branches.
