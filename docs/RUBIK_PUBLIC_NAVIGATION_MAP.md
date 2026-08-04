# Rubik Public Navigation Map

Status: v1 - public navigation and catalog coordination guide.

## Purpose

Rubik Sota now has several public entry points. This document defines their roles so the platform does not drift into duplicated or inconsistent catalogs.

## Public Entry Points

### Root Home

URL: `/Rubik-Sota-Director-de-Orquesta/`

Role: executive landing and interactive portfolio.

It should:

- explain Rubik Sota quickly;
- showcase the interactive portfolio layer;
- link clearly to Gesture Lab;
- highlight MIRRORA and the latest commercial families;
- avoid trying to be the full module catalog.

### Gesture Lab

URL: `/Rubik-Sota-Director-de-Orquesta/gesture-lab/`

Role: catalog master.

It should be the public source of truth for:

- active Core Gesture Lab modules;
- MIRRORA;
- Fashion / Moda Platform;
- Living Maps 3D;
- Gesture Retail Commerce;
- Gesture FX / Visual Shows;
- Gesture Gaming Arena;
- Gesture Interface Core;
- ZOLTAN;
- Camera FX Cum Laude;
- Gesture Gaming;
- Sword and R&D launchers;
- roadmap and future sectors.

### Family Deep Links

Examples:

- `/gesture-lab/#mirrora-platform`
- `/gesture-lab/#fashion-platform`
- `/gesture-lab/#living-maps-3d`
- `/gesture-lab/#gesture-retail-commerce`
- `/gesture-lab/#gesture-fx-visual-shows`
- `/gesture-lab/#gesture-gaming-arena`
- `/gesture-lab/#gesture-interface-core`
- `/gesture-lab/#zoltan-platform`
- `/gesture-lab/camera-fx-cum-laude/`

Role: commercial family landing or direct QA entry.

They should point back to Gesture Lab when the user needs the complete catalog.

## Rules

- Do not remove or rename published module routes.
- Keep old URLs working.
- Update the root home only with highlights and catalog links.
- Update Gesture Lab when adding or closing a module.
- Update README when a module changes status.
- Keep counters conservative. Prefer family labels over exact counts when active/planned numbers are moving.
- Use ASCII for new text unless the file is already confirmed clean UTF-8.

## Current Recommended Hierarchy

1. Root Home: public executive entry.
2. Gesture Lab: catalog master.
3. MIRRORA: identity/portal/live display family.
4. Fashion / Moda: fashion access family inside Director de Orquesta.
5. Living Maps 3D: territorial, map, webcam and 3D city family.
6. Gesture Retail Commerce: next commercial family for storefronts, MUPIs, carts, QR and conversion.
7. Gesture FX / Visual Shows: visual attention family for webcam effects and branded screens.
8. Gesture Gaming Arena: challenge/gameplay family, visible but later implementation.
9. Gesture Interface Core: internal/transversal gesture vocabulary and UX layer.
10. ZOLTAN: commercial reveal/reward family.
11. Camera FX: webcam activation family with 7 submodules.
12. Gesture Gaming and Sword: R&D/gameplay family.
13. README: project memory and technical documentation, not the main public catalog.

## Fashion / Moda Rule

Director de Orquesta remains the global brain and public orchestrator.

Fashion Studio SOL is not the global brain. It is the advanced external module for the Fashion vertical:

- wardrobe and garment intake;
- outfits and approval states;
- AI Closet contracts;
- pose/model consistency;
- assets, jobs and publication rules.

Rubik should expose Fashion Studio SOL beside the existing fashion modules:

- Fashion Studio SOL;
- Selfie Style / Outfit Visualizer;
- Fashion Lookbook;
- ZOLTAN Style Oracle;
- MIRRORA fashion campaigns, MUPI and QR experiences.

Do not copy Fashion Studio SOL into Rubik unless a future integration explicitly needs local runtime files. For now, link it, document it and use it as the advanced Fashion source.

## Living Maps 3D Rule

Director de Orquesta exposes Living Maps 3D as the territorial and map-based experience family.

The current flagship candidates must stay visible together until QA proves which one is strongest:

- La Batuta de Torrevieja: premium narrative gesture map, tourism-first, based on `map-gesture-controls`;
- Maqueta Viva 3D Torrevieja: 3D territorial prototype in `little-big-city`, gesture-ready but not yet a live webcam module;
- Living Map Experience: configurable map product with POIs, unlocks, reward, CTA, kiosk mode and privacy-first camera flow.

Current sector focus is tourism. The same family should remain transversal for real estate, retail, culture, events, education, smart city and digital storefronts.

Public links:

- `https://juanmaes83.github.io/map-gesture-controls/demo/batuta-torrevieja.html`
- `https://juanmaes83.github.io/little-big-city/maqueta-viva-torrevieja.html`
- `https://juanmaes83.github.io/map-gesture-controls/demo/living-map.html`

Do not copy those external repos into Rubik for now. Rubik should link, explain status and preserve the separation between orchestrator, engines and product demos.

## New Gesture Ecosystem Families

Rubik should expose only the family layer in the public UX:

- Gesture Retail Commerce: first implementation priority after this documentation pass. It should build on Retail Window Pro, Interactive Gesture Catalog and Virtual Shopping Cart ideas.
- Gesture FX / Visual Shows: second implementation priority. It should build on Camera FX, particle effects, audio visualizer and SwordArt references.
- Gesture Gaming Arena: third implementation priority. It should organize racing, cube, character/game challenges and scoring, but needs more QA.
- Gesture Interface Core: not a standalone product. It is the shared gesture UX/engine contract for privacy, calibration, fallback, confidence and gestures.

Detailed audit: `docs/RUBIK_REPO_ECOSYSTEM_AUDIT.md`.

Family READMEs:

- `gesture-lab/gesture-retail-commerce/README.md`
- `gesture-lab/gesture-fx-visual-shows/README.md`
- `gesture-lab/gesture-gaming-arena/README.md`
- `gesture-lab/gesture-interface-core/README.md`
