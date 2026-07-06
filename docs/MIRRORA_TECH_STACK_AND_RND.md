# MIRRORA Tech Stack And R&D

Status: research documentation only. No dependency added. No model added.

## Primary R&D Reference: Face Anything

Links:

- GitHub: https://github.com/kocasariumut/FaceAnything
- Project page: https://kocasariumut.github.io/FaceAnything/
- Hugging Face Space: https://huggingface.co/spaces/UmutKocasari/FaceAnything
- Paper: https://arxiv.org/abs/2604.19702

Face Anything is a research system for 4D face reconstruction from image sequences. The project describes dense tracking, depth prediction and canonical facial coordinates as its central representation.

## Known Technical Requirements

Based on the public repository documentation, Face Anything is not a lightweight browser component:

- Python workflow.
- CUDA GPU required.
- Tested environment is Python 3.11 / PyTorch with CUDA.
- Large checkpoint workflow.
- Command-line inference.
- Outputs are generated offline or on a GPU machine.

Implication for MIRRORA: treat Face Anything as offline R&D, not production browser code.

## Known Outputs To Study

The public repository describes outputs including:

- `videos/pointcloud.mp4`
- `videos/tracks.mp4`
- `videos/canonical.mp4`
- `videos/depth.mp4`
- `videos/normals.mp4`
- `videos/grand_tour.mp4`
- `videos/grand_tour_2d.mp4`
- `videos/*_2d.mp4`
- `maps/*`
- `ply/{geometry,canonical,tracks}/frame_XXXX.ply`
- `cameras.npz`
- `cameras.json`
- `raw_predictions.npz`

MIRRORA should first test whether these outputs can be consumed as static assets, videos or Three.js point cloud viewers before considering model execution inside the platform.

## License And Commercial Risk

The public repository currently states Creative Commons Attribution-NonCommercial 4.0 International. That makes it a high-risk or blocked candidate for direct commercial use without separate permission or legal clearance.

MIRRORA must document Face Anything as:

- R&D reference.
- Prototype-only technology.
- Not approved for commercial client delivery.
- Not to be embedded into production until license review is complete.

## Architecture Option A: Offline Prototype

Purpose: safest first test.

Flow:

1. User or developer provides face image/video outside the repo.
2. Face Anything is run on a separate local GPU machine.
3. Generated videos, maps and PLY files are exported.
4. Gesture Lab loads those outputs as static demo assets.
5. MIRRORA evaluates visual quality, export compatibility and user value.

Advantages:

- No backend.
- No repo dependencies.
- No browser GPU burden.
- Clear separation between R&D processing and Gesture Lab viewer.

Risks:

- Manual workflow.
- Not real-time.
- Data handling must be documented.

## Architecture Option B: Local GPU Prototype

Purpose: controlled lab environment.

Flow:

1. A local workstation runs the model.
2. Gesture Lab remains static.
3. Outputs are dropped into a local `mirrora` demo folder.
4. Viewer tests consume only already-generated assets.

Requirements:

- GPU machine.
- Clear storage and deletion policy.
- No uploading user face data to third-party services without consent.

## Architecture Option C: Future Async Production

Purpose: possible future product architecture, not approved now.

Flow:

1. User gives explicit consent.
2. Face image/video is uploaded to a secure processing service.
3. Processing job runs asynchronously.
4. Generated assets are returned to a static viewer/reward module.
5. Data is deleted after defined retention period.

Required before production:

- License clearance.
- Data processing agreement.
- Security review.
- Consent UX.
- Deletion flow.
- Abuse prevention.
- Minors policy.
- Model output QA.

## Complementary Technologies To Research

### Landmarks

Use for lightweight face anchoring, accessory placement and alignment. Candidate areas: MediaPipe Face Mesh, browser-based landmark detection, or preprocessed landmarks.

### Segmentation

Needed for background removal, hair/face separation, garment or accessory overlays and clean souvenir exports.

### Face Alignment

Needed before try-on, avatar generation, identity souvenir framing and consistent poster output.

### Overlay Engine

Needed for glasses, lipstick, hats, caps, beard, hair, jewelry and cosmetic elements.

### Accessory Placement

Requires robust anchors, occlusion handling, scale normalization, face pose estimation and fallback UI.

### Lip-sync / Narration Pipeline

Optional future line for StoryFace Portal. Must avoid deceptive impersonation and include consent and disclosure.

### Three.js / Point Cloud Viewer

Useful if MIRRORA wants to display PLY or point-cloud assets. Initial goal should be viewer-only, not model execution.

## R&D Gate Checklist

- Does it run without touching ZOLTAN?
- Does it work as static output first?
- Does it avoid sensitive inference?
- Is the license compatible?
- Is user consent explicit?
- Can outputs be deleted?
- Does it work on mobile as viewer?
- Does the final reward avoid exposing raw face data unless user chooses it?
