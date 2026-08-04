# Gesture Retail Commerce

Status: family index + first browser-first commercial module.

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

Gesture Retail Commerce v1 includes:

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
- 16:9 and 9:16 display modes;
- clean storefront/kiosk mode;
- unique PNG export.

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
- Confirm if v1 is stable enough to promote as a closed module.
