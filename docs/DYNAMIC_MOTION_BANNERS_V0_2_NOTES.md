Dynamic Motion Banners v0.2 - Notes
===================================

Objective
---------

Evolve the visible v0.1 module into a richer standalone commercial tool while preserving the existing WebGL cloth/paper physics, Canvas 2D texture generation, presets, PNG export, panel layout and local route.

Technical decisions
-------------------

- Keep the file route as `gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-1.html`.
- Show the module as Dynamic Motion Banners v0.2 in the UI.
- Separate media state into main image, video and logo layers.
- Compose the final texture in Canvas 2D before sending it to WebGL.
- Let image and video coexist through a media mode selector: image, video or both.
- Use `canvas.captureStream(30)` and `MediaRecorder` for visual WebM recording when supported.
- Use CSS presentation mode first, with `requestFullscreen()` as an optional enhancement.
- Keep audio playback separate from WebM recording for this phase.

Limitations
-----------

- WebM output captures the animated WebGL canvas only. Audio is playback-only in v0.2.
- Browser support for MediaRecorder and `video/webm` can vary.
- Some remote audio/radio URLs can fail because of CORS or browser media policies.
- The QR remains a premium placeholder; no QR library is added.
- The module is still standalone and not connected to the Hub.

QA performed
------------

- Static checks: diff check, JavaScript parse, duplicate IDs, orphan `getElementById`, forbidden text search.
- Browser checks: desktop load, mobile 390x844 load, no console errors, no horizontal overflow.
- Interaction checks: presets, image controls, logo controls, media mode, PNG export, recording controls, presentation mode and audio controls.

Next steps
----------

- Review visual hierarchy and spacing after real campaign assets are tested.
- Decide when to expose v0.2 from the Gesture Lab Hub.
- Add stronger export presets only after product review.
