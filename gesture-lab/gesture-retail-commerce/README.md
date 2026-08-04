# Gesture Retail Commerce

Status: family index. First recommended new module family after MIRRORA and Living Maps 3D.

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

## Suggested first product

Gesture Retail Commerce v1:

- live or demo input;
- product grid;
- gesture or button fallback;
- select product;
- add to wishlist/cart;
- QR for mobile continuation;
- CTA;
- logo/campaign controls;
- 16:9 and 9:16 display modes;
- export PNG or short campaign summary.

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

## Next decision

Build one browser-first v1 that extends the current Rubik retail patterns instead of importing an external repo wholesale.
