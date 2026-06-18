Asset & Effects Library
=======================

Purpose
-------

This document defines how Rubik Sota Director de Orquesta stores and governs reusable assets and visual effects.

Strategic rule
--------------

Effects and assets support the main system.

They are not separate products.

Effects lifecycle
-----------------

raw-source
-> cleaned
-> production-ready
-> module integration

Registered raw effects
----------------------

### Dynamic Motion Banner WebGL

Source:

https://github.com/Juanmaes83/BANDEROLAS-DINAMICAS

Status:

raw

Future module:

Dynamic Motion Banners v0.1

Summary:

Standalone WebGL banner/fabric/paper motion effect using Canvas 2D texture generation, custom shaders, Verlet physics, mouse/touch interaction, image/video upload and PNG export.

Commercial potential:

- fashion;
- retail;
- storefronts;
- campaigns;
- events;
- real estate;
- QR/outreach pieces.

Important:

This is not production-ready.

It must be cleaned, neutralized, redesigned and QA-tested before being used in a published Gesture Lab module.

Rules
-----

- Do not publish raw effects directly.
- Do not integrate effects without QA.
- Do not copy third-party effects without checking license.
- Do not add heavy motion without mobile performance review.
- Do not touch published modules from foundation branches.
