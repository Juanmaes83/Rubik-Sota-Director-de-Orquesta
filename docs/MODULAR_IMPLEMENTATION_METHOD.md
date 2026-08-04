# Modular Implementation Method

Status: operating method for Rubik Sota modules.

## Principle

Rubik Sota grows from small functional modules, not from large speculative builds.

The right sequence is:

1. Build one minimal but useful module.
2. Validate that it works in browser, mobile and campaign context.
3. Document what it does, what it does not do and where it can be used.
4. Add meaningful capabilities inside the same module.
5. Clone or create a new module only when the workflow becomes truly different.

## Why

This protects the platform from demo inflation.

Rubik should not accumulate ten similar modules when one strong configurable module can cover the commercial need.

The goal is not more folders. The goal is more validated value.

## Module Maturity Levels

### Level 0 - Reference

External repo, idea or technical demo.

Example: `finger-frame-effect-ai`, `blinkface`.

### Level 1 - Lightweight Prototype

First internal module that proves the core interaction.

Requirements:

- opens from Gesture Lab;
- runs in browser;
- has privacy copy;
- has manual fallback or local mode;
- can be tested without paid API when possible;
- has README and usage guide.

### Level 2 - Commercial Composer

The module becomes useful for clients.

Requirements:

- custom assets;
- brand/logo;
- CTA/landing;
- export;
- clear sector use cases;
- controls that change the final output.

### Level 3 - Sector Presets

The same module includes presets for sectors without duplicating the engine.

Examples:

- tourism;
- retail;
- real estate;
- events.

### Level 4 - Separate Sector Module

Create a new module only when a sector needs a different workflow, such as:

- lead form;
- product catalog;
- multi-step guided capture;
- kiosk mode;
- backend integration;
- different tracking engine.

## Rule For Cloning

Clone only when at least one of these is true:

- the user journey is different;
- the input/output contract is different;
- the deployment target is different;
- the sector needs specific controls;
- the code would become confusing if kept as a preset.

Do not clone only to change:

- title;
- background;
- CTA copy;
- logo;
- color palette;
- one example asset.

## Rule For Engines

Rubik can host lightweight modules inside `gesture-lab/`.

Rubik should document heavy engines and connect to them when useful, but not absorb them blindly.

Heavy engines include:

- GPU servers;
- Python backends;
- model weights;
- node_modules-heavy apps;
- provider-specific generation pipelines;
- live camera engines with security requirements.

## MIRRORA Finger Frame Example

Correct path:

1. Integrate first module: `finger-frame-portal`.
2. Prove tracking and export.
3. Add Portal Composer in v1.1.
4. Add presets inside the same module.
5. Consider separate modules only after real sector workflow evidence.

Incorrect path:

1. Create separate tourism, retail, hotel, museum and real-estate copies immediately.
2. Repeat the same code with different text.
3. Lose track of which version is stable.

## Acceptance Gate Before Publishing A Module

A module should answer:

- What does the user do?
- What value does the client get?
- What is processed locally?
- What needs remote API or backend?
- What is the fallback?
- What can be exported?
- What sector is it for?
- What should be tested on mobile?
- What are the known risks?

