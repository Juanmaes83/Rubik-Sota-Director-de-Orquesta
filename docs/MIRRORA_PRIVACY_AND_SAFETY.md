# MIRRORA Privacy And Safety

Status: mandatory guardrails before any implementation.

## Core Principle

MIRRORA must treat face input as sensitive visual data even when the product does not perform biometric identification. The safest default is local processing, explicit consent, no permanent storage and visible deletion.

## Explicit Consent

Every MIRRORA module must explain before camera/upload:

- What is captured.
- Why it is captured.
- Whether processing is local or remote.
- What output is generated.
- Whether the face input is stored.
- How to delete or reset the session.

Recommended copy:

> MIRRORA uses your camera or uploaded image only to create this visual experience on this device. It does not identify you, does not recognize your identity, does not infer age, emotions, health or sensitive traits, and does not store your image permanently by default.

## Prohibited Claims

MIRRORA must not claim:

- Face recognition.
- Identity verification.
- Biometric identification.
- Medical diagnosis.
- Skin diagnosis.
- Age detection.
- Emotion detection.
- Attractiveness scoring.
- Ethnicity, gender, religion, health or other sensitive-attribute inference.
- Psychological or personality truth.

## Data Handling Defaults

- No permanent storage by default.
- No backend by default.
- No third-party upload without explicit opt-in.
- No hidden camera activation.
- No raw face export unless user actively downloads it.
- Automatic reset should clear temporary media where technically possible.
- Local object URLs must be revoked where used.

## Minors

Modules that may be used by minors require:

- Guardian-aware copy.
- No lead capture without appropriate consent.
- No face data retention.
- No public sharing by default.
- Extra caution in schools, museums and family events.

## Sector Limits

### Beauty / Cosmetics

Allowed: visual try-on, shade preview, look card.

Not allowed: skin health diagnosis, age estimation, medical claims.

### Wellness

Allowed: non-medical ritual, relaxation-themed visual output.

Not allowed: stress detection, mental health inference, medical advice.

### Optics

Allowed: frame preview and style exploration.

Not allowed: prescription, eye health diagnosis or fit guarantee.

### Hair / Barber

Allowed: style or color visualization.

Not allowed: claims about hair health or guaranteed salon result.

### Events / Museums / Tourism

Allowed: souvenir, avatar, storytelling with consent.

Not allowed: impersonation without disclosure or reuse of likeness beyond the session.

## Production Requirements

Before any production MIRRORA module:

- Legal review.
- License review for all AI/model components.
- Privacy review.
- Security review.
- Consent UX review.
- Data deletion mechanism.
- Mobile QA.
- Accessibility QA.
- Fallback without camera.
- Abuse and misuse review.

## Face Anything Specific Safety Notes

Face Anything must not be added to production until:

- Its license is reviewed.
- Commercial rights are clarified.
- GPU processing architecture is approved.
- Data retention is defined.
- Model outputs are tested for quality and failure modes.
- User consent covers reconstruction, point clouds, depth, normals and generated videos.

## Recommended UX Labels

- "Camera optional".
- "Touch fallback available".
- "Local preview".
- "No identity recognition".
- "No permanent storage by default".
- "Delete/reset session".
- "Download final souvenir".

## Acceptance Gate

A MIRRORA module is not shippable unless it can answer:

1. What face data is captured?
2. Where is it processed?
3. Is it stored?
4. How is it deleted?
5. What does the user receive?
6. Does the UI avoid biometric or diagnostic claims?
7. Are minors handled safely?
