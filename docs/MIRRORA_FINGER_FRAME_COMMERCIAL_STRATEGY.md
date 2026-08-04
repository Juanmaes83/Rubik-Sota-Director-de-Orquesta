# MIRRORA Finger Frame Commercial Strategy

Status: v1.1 strategy for commercial composer.

## Core Idea

MIRRORA Finger Frame turns a simple hand gesture into a commercial window. The user does not only watch a screen: they open a branded portal with their hands.

The commercial value is not the tracking by itself. The value appears when the window reveals a destination, product, hotel, property, event, offer, look, route or branded memory.

## Current Product Shape

`gesture-lab/mirrora/finger-frame-portal/` is the first functional module:

- base video with two-hand finger-frame gesture;
- customizable portal content as image or video;
- frame expansion and content scale/offset controls;
- headline, brand, CTA and landing URL;
- optional logo;
- local browser preview and export;
- Gemini BYOK path kept as optional AI restyle, not required for local commercial composition.

## Why This Matters To Rubik Sota

Rubik Sota is not a collection of demos. It is a modular platform for turning interaction, visual effects and AI into sector experiences that can convert attention into action.

Finger Frame fits Rubik because it is:

- easy to understand in one second;
- natural for web, mobile, digital windows and MUPIs;
- strong on video and social sharing;
- adaptable without rebuilding the engine;
- compatible with local fallback and privacy-first UX;
- directly connected to conversion through CTA, logo and landing.

## Priority Sectors

### Tourism / Hotels / Resorts

Use case: `Frame Your Destination`.

The user frames the screen and sees a hotel room, beach, rooftop, route, boat trip or destination moment inside the portal.

Conversion:

- book now;
- request itinerary;
- continue on mobile;
- download souvenir;
- send to WhatsApp.

### Retail / Fashion / Beauty

Use case: `Frame Your Look`.

The portal reveals a product, lookbook clip, sneaker, accessory, beauty mood, perfume visual or campaign asset.

Conversion:

- wishlist;
- claim offer;
- book appointment;
- open product landing;
- enter store.

### Real Estate / Promoters

Use case: `Frame Your Future Home`.

The portal reveals a property view, staged room, render, before/after proposal or lifestyle scene.

Conversion:

- request visit;
- send to agent;
- continue property tour;
- download campaign piece.

### Events / Brand Activations

Use case: `Brand Portal Booth`.

The visitor makes the gesture and receives a branded export with campaign content, CTA and logo.

Conversion:

- lead capture;
- QR/landing;
- contest entry;
- social share;
- booth-to-mobile continuation.

### Museums / Culture / Education

Use case: `Frame Yourself Into History`.

The portal reveals a historical scene, exhibit, character, route or learning moment.

Conversion:

- continue tour;
- buy ticket;
- download souvenir;
- share educational card.

## Product Packaging

Do not create many modules immediately. Keep one solid composer and add visible capabilities inside it.

Recommended packaging:

1. `Finger Frame Portal v1.1`: generic commercial composer.
2. Presets inside the module: tourism, retail, real estate, events.
3. Only create a separate module when a sector needs a clearly different workflow, not only different copy.

## Next Useful Enhancements

High-value additions, in order:

1. Preset selector for tourism / retail / real estate / event.
2. QR generation for landing URL.
3. Export format presets: web story, mupi horizontal, mobile vertical.
4. Save/load local campaign configuration.
5. Optional Gemini/OpenAI/Runway/Higgsfield provider adapter, behind a provider interface.
6. Live camera/GPU path using `blinkface` only after security, cost and privacy review.

## Acceptance Criteria For Commercial Use

Before presenting as stable:

- runs on GitHub Pages;
- mobile upload works;
- portal image/video loads reliably;
- frame controls visibly affect the exported result;
- CTA/logo render correctly in export;
- local mode works without API key;
- remote AI mode is clearly disclosed;
- no raw face/video is stored by Rubik;
- mobile export behavior is documented.

