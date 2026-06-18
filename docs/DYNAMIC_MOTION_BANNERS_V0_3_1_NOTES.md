Dynamic Motion Banners v0.3.1 — Client Preview Export Polish
============================================================

Objective
---------

Convert the existing v0.3 export workflow into a coherent commercial preview package that can be sent to a client. No bigger feature scope, just packaging quality.

Same module file on disk (`rubik-sota-dynamic-motion-banners-v0-3.html`), no v0.4 yet, no Hub link, no change to production modules (`v2.7`, `v2.8`, `fashion-lookbook`, `gesture-detection-lab`).

Architecture: HTML standalone
-----------------------------

`clientPreviewHtmlTemplate({ imageSrc })` produces a single-file HTML where the rendered piece is centered, occupies up to ~84vh by ~92vw with `object-fit: contain`, and discrete metadata (brand, campaign, QR destination, generation timestamp) sits underneath in a minimal grid.

When called without `imageSrc` the template embeds the rendered piece as a `data:image/png;base64` URI, producing a self-contained HTML.

The template contains no internal tool labels (`DYNAMIC MOTION BANNERS`, version strings, debug, editor, technical preview) and no localhost/blob/C: paths.

Architecture: ZIP preview package
---------------------------------

Strict shape — nothing else is exported:

```
dynamic-motion-banner-<brand>-<campaign>-preview.zip
├── index.html
├── README.txt
├── manifest/
│   └── config.json
└── assets/
    └── banner-preview.png
```

- `index.html` uses the same template as the standalone but with `imageSrc = "assets/banner-preview.png"` (relative path, no embedded data URL).
- `assets/banner-preview.png` is a real binary PNG (`89 50 4E 47 ...`), not a `.txt` data URL.
- `manifest/config.json` follows a fixed schema: `version`, `exportType`, `generatedAt`, `brand`, `campaign`, `headline`, `subheadline`, `cta`, `note`, `qr.{type,input,resolvedDestination,scanValidation}`, `gallery.{enabled,count}`, `assets.bannerPreview`, `notes`. No data URLs, no localhost references, no blobs.
- `README.txt` is written for the client in plain language. It states cliente/marca, campaña, generated date, how to open `index.html`, what to review, QR destination, scan validation reminder, and approval flow. No `WebGL`, `base64`, `blob`, `CRC` or `data URL` jargon.

Why v0.3.1 is a static premium preview (and not interactive)
-----------------------------------------------------------

A live interactive preview (video, gallery assets, audio, attract loop) would require shipping every media asset and re-mounting the editor runtime in the ZIP, which is exactly what the v0.3 implementation did with `.txt` data URL assets that nothing actually consumed. That left noisy ZIPs and an `index.html` that didn't reflect the final piece.

v0.3.1 commits to a coherent static rendering: the PNG, the standalone HTML, and the ZIP `assets/banner-preview.png` are produced from the same `generateClientPreviewDataUrl()` call, so they represent the same piece. Future interactive playback belongs to a separate v0.4 stream.

Real QR encoder
---------------

Replaced the previous pattern-based placeholder (hash mod 7 module mask) with a real ISO/IEC 18004 byte-mode encoder embedded in the file:

- GF(256) Reed-Solomon with primitive `0x11D`.
- Versions 1..9, error correction level L, single segment, byte mode.
- BCH(15,5) format info with the standard mask `0x5412`.
- All eight mask patterns evaluated; lowest-penalty mask (rules 1, 2 and 4 of the spec) is selected.
- Capacity: up to 232 codewords at v9-L (~228 bytes after overhead) — sufficient for URLs, `tel:`, `mailto:` and `wa.me/...` links.
- `resolveQrDestination()` normalises input into a final destination: `https://` prepended on URLs without protocol, digits-only `tel:`, `https://wa.me/<digits>` for WhatsApp, basic regex validation for email.
- The resolved destination is shown in the editor panel, in `manifest.qr.resolvedDestination`, and in the README.

Important: the encoder follows the spec but **physical scanning with a mobile reader has not been performed in this session**. `manifest.qr.scanValidation` is set to `"pending"` and the README explicitly tells the reviewer to scan the QR before approving.

Naming convention
-----------------

`clientFileNameBase()` produces sanitized slugs from brand + campaign (NFD-stripped, lowercase, hyphenated, max 48 chars). Pattern: `dynamic-motion-banner-<brand>-<campaign>-preview`. Used for PNG, HTML, ZIP and WebM exports. Fallback: `dynamic-motion-banner-client-preview-<timestamp>` when neither field is present.

Logo brand-safe area
--------------------

`drawLogoLayer` repositioned inside the cream content plate (top-right, ~16.5% of texture width, with padding). A new "Soporte logo" select offers four card styles: `translucent` (default), `light`, `dark`, `none`. The internal label "DYNAMIC MOTION BANNERS v0.3" that was previously drawn into the texture was removed.

Gallery coherence
-----------------

Gallery renders 0/1/2/3 items as before. The change is in export: ZIP no longer ships `gallery-1.txt`, `gallery-2.txt`, `gallery-3.txt`, `main-image.txt`, `logo.txt` or `video-data-url.txt`. The manifest reports `gallery.enabled` and `gallery.count`, and the integrated visual is already baked into `assets/banner-preview.png`.

QA performed
------------

Static
- `git diff --check` clean.
- JavaScript parse OK on the single script block.
- No duplicate `id="…"`.
- No mojibake markers or placeholder (`{{`) tokens.
- Forbidden strings (`DYNAMIC MOTION BANNERS`, `Dynamic Motion Banners`, `localhost`, `127.0.0.1`, `blob:`, `C:\Users`, `data-url.txt`, gallery `.txt` names) do not appear inside the client templates (`clientPreviewHtmlTemplate`, `clientReadmeText`, manifest).
- Forbidden strings still appear in editor-only chrome (page `<title>`, `<h1>`, brand kicker) — which is allowed by the brief.

Functional (puppeteer-core + headless Chrome)
- Page loads with 0 page errors / 0 request failures (only `favicon.ico` 404).
- Brand and campaign fields wired to slug naming: `dynamic-motion-banner-rubik-sota-coleccion-otono-preview.html/.zip`.
- Captured ZIP central directory contains exactly four entries: `index.html`, `README.txt`, `manifest/config.json`, `assets/banner-preview.png`. No additional files. Sizes (real run): index ~1.6 KB, README ~1 KB, manifest ~0.75 KB, PNG ~905 KB. Total ZIP ~908 KB.
- `assets/banner-preview.png` magic bytes verified `89 50 4E 47 0D 0A 1A 0A`.
- `manifest.qr.resolvedDestination` matches the editor input and the README QR section.
- `index.html` references `src="assets/banner-preview.png"` (relative). Does not reference `localhost`, `127.0.0.1`, `blob:` or `C:\Users`.
- HTML standalone is self-contained: embeds the PNG as a data URI in the `<img>` tag and renders with the same metadata grid below.

What was NOT validated in this session
--------------------------------------

- Physical QR scan with a real mobile device. The encoder follows the ISO spec but the artefacts in this run have not been scanned. `manifest.qr.scanValidation` stays `"pending"` and the README instructs the reviewer to scan before approving.
- Real download to disk via a browser. Captures came through an `URL.createObjectURL` + `<a>.click()` override.
- Mobile-real viewport on a physical device (Codex in-app browser does not represent it). Standalone CSS already uses `max-width: 96vw; max-height: 78vh` on `< 640px`.

What stayed out of scope (deferred to v0.4 if needed)
-----------------------------------------------------

- Interactive ZIP that re-mounts the editor with video and gallery assets bundled.
- Audio mixed into the WebM recording.
- Multi-language export (currently Spanish UI / Spanish README).
- An option to encode the QR at a higher EC level (M/Q/H) for damage-tolerance.

Follow-up
---------

- v0.3.2 adds the editor-side QR and gallery visibility fix so local users can find the QR destination field, activate the lower gallery, load 3 images and export a ZIP whose manifest reflects that state. See `docs/DYNAMIC_MOTION_BANNERS_V0_3_2_NOTES.md`.
