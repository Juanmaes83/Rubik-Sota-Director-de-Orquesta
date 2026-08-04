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
- ZOLTAN;
- Camera FX Cum Laude;
- Gesture Gaming;
- Sword and R&D launchers;
- roadmap and future sectors.

### Family Deep Links

Examples:

- `/gesture-lab/#mirrora-platform`
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
4. ZOLTAN: commercial reveal/reward family.
5. Camera FX: webcam activation family.
6. Gesture Gaming and Sword: R&D/gameplay family.
7. README: project memory and technical documentation, not the main public catalog.
