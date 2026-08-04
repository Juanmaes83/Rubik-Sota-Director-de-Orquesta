# Gesture Retail Commerce

Status: family index + first browser-first commercial module, v1.2 with guided UX and conversion close.

Goal: turn webcam gestures, storefront screens, MUPIs and product cards into conversion flows: select, wishlist, cart, QR, mobile continuation and campaign export.

## Why this family matters

This is the most direct commercial bridge between Rubik and revenue:

- it fits retail windows, shopping centers, franchise stores, fairs and pop-up activations;
- it can reuse Retail Window Pro, Interactive Retail Window and Interactive Gesture Catalog;
- it can be personalized like MIRRORA: brand, logo, products, CTA, QR, campaign name, screen format and downloadable output.

## Source repos and modules

- `gesture-lab/retail-window-pro/` - current stable Rubik retail conversion module.
- `gesture-lab/interactive-retail-window/` - earlier storefront interaction module.
- `gesture-lab/interactive-gesture-catalog/` - gesture/catalog interaction base.
- `https://github.com/Juanmaes83/Virtual-Shopping-Cart-OPENCV` - gesture shopping/cart reference.
- `https://github.com/Juanmaes83/NonMouse` - optional control reference.

## First product

Local module:

`gesture-lab/gesture-retail-commerce/rubik-sota-gesture-retail-commerce-v1.html`

Gesture Retail Commerce v1.2 includes:

- live or demo input;
- product grid;
- optional MediaPipe camera gesture control;
- button and keyboard fallback;
- select product;
- add to wishlist/cart;
- real QR for mobile continuation when the QR library loads;
- CTA;
- logo/campaign controls;
- product image upload for the active product;
- public product image URL for GitHub Pages/mobile QA without backend;
- 16:9 and 9:16 display modes;
- clean storefront/kiosk mode for the final user;
- Studio/Admin mode for the store owner;
- shareable Display URL with embedded campaign configuration;
- state-based instruction overlay;
- hand detected / searching hand indicator;
- visual hand cursor;
- large confirmations for active product, cart and wishlist actions;
- final selection panel with large QR, CTA and selected products;
- selection PNG download for the final user;
- real conversion parameters in the QR/CTA URL;
- unique PNG export.

## How to use

Studio/Admin URL:

`gesture-lab/gesture-retail-commerce/rubik-sota-gesture-retail-commerce-v1.html?mode=studio`

Use this mode for the store owner, agency or Rubik operator. It exposes personalization controls: preset, brand, campaign, headline, CTA, landing/WhatsApp, colors, logo, selected product image, product image URL, name, price, promo, cart/wishlist test actions, QA camera preview, keyboard shortcuts and export.

Display/MUPI URL:

`gesture-lab/gesture-retail-commerce/rubik-sota-gesture-retail-commerce-v1.html?mode=display`

Use this mode for the final user in a storefront, MUPI, mobile test or public activation. It hides the personalization panel and keeps only the commercial interaction: camera consent, gesture/demo interaction, visible gesture guidance, product selection, add, QR, CTA and final selection download.

Final-user flow:

1. The screen invites the user to choose with the hand.
2. The HUD shows if the hand is being searched or detected.
3. Moving the hand changes the active product.
4. Pinch adds the active product to cart.
5. Hand up saves it to wishlist.
6. `Finalizar selección` opens the conversion panel.
7. The user scans the QR, opens the CTA or downloads `mi selección` as PNG.

Important: this is still browser-first and does not include a backend. Uploaded files are local to the current browser. For phone testing from GitHub Pages, use public image URLs or assets committed to the repo, then copy/open the generated `Vista escaparate` link.

## Target sectors

- fashion;
- beauty;
- electronics;
- supermarkets;
- shopping centers;
- franchise retail;
- fairs;
- tourism retail;
- automotive accessories;
- museums and gift shops.

## What not to do yet

- Do not copy Python/OpenCV code directly into Rubik without a browser-first plan.
- Do not create many category-specific clones.
- Do not expose low-level gesture engines as commercial modules.

## Current QA focus

- Open locally and from GitHub Pages.
- Validate mobile layout.
- Validate QR scan with a real phone.
- Validate camera gesture fallback on a device with webcam.
- Confirm if v1.2 is stable enough to promote as a closed module.
