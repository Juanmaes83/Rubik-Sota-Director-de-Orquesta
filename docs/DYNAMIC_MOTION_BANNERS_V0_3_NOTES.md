Dynamic Motion Banners v0.3 - Notes
===================================

Objective
---------

Create a standalone v0.3 module that behaves more like a commercial review tool: design, preview, export and share a Dynamic Motion Banner with a client.

Files
-----

- Module: `gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-3.html`
- Previous v0.1/v0.2 route remains untouched.
- Hub remains untouched.

Technical decisions
-------------------

- HTML preview export creates a static client review file from the current Canvas texture and embeds serialized campaign configuration.
- ZIP preview export uses a local no-dependency ZIP writer with stored files and CRC32.
- QR destination UI resolves URL, phone, WhatsApp and email inputs into final destinations.
- The logo is drawn inside a stable premium plate so it does not compete with headline or media.
- The lower gallery supports 0 to 3 optional images and adapts item widths.
- Audio remains playback-only and is not mixed into WebM recording.

Limitations
-----------

- The QR is generated locally as a deterministic Canvas code for preview. It should be checked with real devices before production use.
- The ZIP package stores asset data as text data URLs when available from the browser session.
- Browser support for WebM recording and downloads varies.
- Codex in-app browser does not fully support file upload/download QA.

QA notes
--------

- Static validation covers diff check, JavaScript parse, duplicate IDs, orphan `getElementById`, mojibake and forbidden text search.
- Browser QA covers load, visible canvas, no console errors, mobile overflow, control presence, presentation mode and configuration state.
- Real upload/download QA should be repeated in a normal browser before production review.
