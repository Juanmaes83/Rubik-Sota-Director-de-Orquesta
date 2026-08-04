# MIRRORA Finger Frame Portal - Usage Guide

This guide explains how to test and use the first MIRRORA Finger Frame prototype.

## What You Need

- A browser.
- A short video file.
- The video should show a person making a two-hand finger-frame gesture.
- Optional portal content: another image or video to reveal inside the hand frame.
- Optional logo image.
- Optional: a Gemini API key only if you want to test AI video restyling.
- Optional landing URL for the generated QR.

You do not need a webcam for this first version. The module works with uploaded video.

## Does Any Video Work?

Any browser-supported video can be uploaded, but the portal effect only works well if the video contains the correct gesture:

- both hands visible;
- index fingers and thumbs forming a frame;
- hands not too close to the camera;
- good light;
- the frame gesture visible for at least a few seconds;
- face/body not completely blocking the fingers.

If the video does not contain the two-hand frame, the app can still load and preview the video, but the tracked portal window may not appear.

## Recommended Test Video

Record a simple vertical or horizontal clip:

1. Put the phone on a table or ask someone to record.
2. Stand in good light.
3. Raise both hands.
4. Make a rectangle/frame with both index fingers and thumbs.
5. Hold the frame for 3 to 6 seconds.
6. Move slowly.
7. Keep the clip short.

For Gemini mode, keep the file under roughly 15MB.

## Local Demo Mode

Use this first.

1. Open the module.
2. Upload the base test video in the main video drop zone.
3. Optional but recommended: in `Portal Composer`, upload an image or video as `contenido del portal`.
4. Optional: upload a logo.
5. Edit headline, brand, CTA and landing URL.
6. Choose a preset or click `Aplicar preset` to load a campaign baseline.
7. Choose `Original`, `16:9 horizontal` or `9:16 vertical`.
8. Decide if QR and final screen should be active.
9. Adjust frame expansion, content scale and X/Y offset.
10. Adjust `Realce del portal` if the window needs to stand out more.
11. Adjust `Oscurecer exterior` if the content inside the frame needs more contrast.
12. Click `Preparar demo local`.
13. Wait for `Demo local lista`.
14. Click `Previsualizar campana`.
15. If the hand frame is detected, the app reveals the uploaded portal content inside the finger frame.
16. Use `Vista escaparate` for a clean demo view without the editing panels.
17. Click `Exportar video final` to create and download the new composed video if the browser supports recording.

This mode does not need an API key and does not upload the videos, images or logo to an AI provider.

Important: `Preparar demo local` does not create the final file. It only prepares the local composition mode. The new video is created when you click `Exportar video final`, and export takes approximately the same time as the source video duration.

## What To Upload As Portal Content

For tourism:

- hotel room video;
- beach or rooftop video;
- destination image;
- route or experience visual;
- restaurant, boat, spa or landmark clip.

For retail:

- product campaign video;
- lookbook image;
- sneaker or accessory close-up;
- offer visual.

For real estate:

- staged room;
- property view;
- render;
- before/after proposal.

The portal content is what creates commercial value. Without it, the fallback only shows a colored version of the original video for technical QA.

## How To Make The Portal Valuable

Use the frame as a campaign placement, not only as an effect:

- Put the offer, destination, room, menu, product or experience inside `contenido del portal`.
- Use `Expandir marco` to make the tracked hand frame a bit larger if the detected rectangle is too tight.
- Use `Escala contenido` and X/Y offset to place the most important part of the image/video inside the opening.
- Use `Auto ajustar portal` if the content starts leaving the frame.
- Use `Restaurar encuadre` if the controls become too extreme.
- Use `Realce del portal` to separate the portal from the original footage.
- Use `Oscurecer exterior` when the background competes with the commercial content.
- Add logo, headline, CTA and landing before export so the final video can be tested as an ad, MUPI asset, retail window clip or mobile story.

## v1.2 Presets

Use presets as campaign starting points:

- `Turismo`: destination, hotel, route, escape, rooftop, spa or beach.
- `Retail`: product reveal, promotion, loyalty offer or launch.
- `Eventos`: souvenir clip, event pass, sponsor activation or registration.
- `Real estate / hoteles`: property view, room upgrade, visit booking or premium stay.
- `Restauracion / experiencias`: menu, reservation, tasting, route or local experience.

Presets change copy and visual emphasis only. You still decide the portal media, logo and landing.

## Modo Escaparate

`Vista escaparate` hides the editing panels and leaves the campaign output in a clean screen mode. Use it for:

- client demos;
- digital windows;
- MUPI previews;
- mobile presentation;
- checking if the QR, CTA and final screen read from a distance.

This is still based on uploaded video. The future live-camera/MUPI module should add camera capture, automatic loop and reset after interaction.

## Export QA

Before sharing an export:

- Preview once and check that the portal appears for several seconds.
- Export after the current v1.2.1 flow; it resets playback to the beginning before recording.
- Check the downloaded file duration. It should match the uploaded base video duration, not only the final seconds of the preview.
- During preview/export, check the progress indicator. It should count from `0.0s` to the total video duration.
- If the portal warning appears, use `Auto ajustar portal` before exporting.
- Check the QR with a phone before using it in a client demo.
- Check both 16:9 and 9:16 exports if the campaign will run on screens and mobile.
- If the browser downloads WebM instead of MP4, the composition is still valid; convert later if the media plan requires MP4.

## Gemini AI Mode

Use this only after local demo mode works.

1. Paste a Gemini API key.
2. Choose a visual style.
3. Upload a short video under roughly 15MB.
4. Click `Generar video IA`.
5. Wait for the generated video.
6. Preview and export.

The video is sent to Gemini using the user's key. This must be explained clearly before commercial use.

## Testing On Mobile

Do not use the desktop `localhost` URL for mobile testing unless the phone can reach the computer over the same network and the server is bound to the network interface.

Recommended Rubik workflow:

1. Commit the module to the repo.
2. Push it to GitHub.
3. Open the GitHub Pages URL on the phone.
4. Upload a video from the phone gallery.
5. Test local demo mode first.
6. Test QR scan from the exported/previewed screen.
7. Test `Vista escaparate`.
8. Test export on mobile.
9. Only then test AI generation.

GitHub Pages is the preferred test path because mobile browser behavior, file picker, canvas recording and WebM/MP4 support must be checked on the real device.

## What To Validate Before Calling It Stable

- The module opens from GitHub Pages.
- A mobile user can upload a video from gallery.
- Local demo mode detects the hand frame.
- Preview works.
- Export works or fails gracefully.
- QR is readable.
- Final conversion screen appears near the end.
- 16:9 and 9:16 canvas formats render without cropping the CTA/QR.
- The Home/Gesture Lab navigation works.
- Privacy copy is visible before upload.
- Gemini mode is clearly marked as optional remote AI generation.

## Known Limits

- Random videos without the finger-frame gesture will not show the main effect.
- Fast hand movement can break tracking.
- Poor lighting can break tracking.
- Mobile Safari may not support every MediaRecorder export format.
- Gemini generation can be slow, fail, or change API behavior.
- This prototype is not a live webcam version. The live path belongs to a future `blinkface`/GPU-backed phase.
