# MIRRORA Provider Architecture

Status: planning contract for future MIRRORA AI providers.

## Why This Exists

MIRRORA should not be locked to a single AI provider. The current module works with:

- `local`: browser-only tracking, portal composition and export;
- `gemini`: optional BYOK video restyle path.

Future providers must be added behind a provider layer, not mixed directly into the UI flow.

## Provider Contract

Every provider should answer the same questions:

- What input does it accept: image, video, prompt, mask, gesture metadata or live frames?
- Where does processing happen: browser, external API, MCP connector, GPU backend or local server?
- What credentials are required?
- What data leaves the device?
- What output returns: image, video, stream, job id or downloadable asset?
- What is the expected latency and cost?
- Can it run on GitHub Pages, or does it require a backend?

## Providers

### local

Browser-only mode. Uses uploaded media, MediaPipe tracking, canvas composition, QR and export.

Use for:

- demos;
- privacy-first tests;
- GitHub Pages;
- mobile gallery upload;
- retail/tourism campaign proof of concept.

### gemini

Current optional BYOK restyle path. The user supplies the key and the video is sent to Google.

Use for:

- visual restyle experiments;
- short uploaded clips;
- tests where remote AI processing is explicitly accepted.

### openai

Candidate provider for image/video generation or multimodal campaign assistance once the desired API path is selected.

Use for:

- generating portal assets;
- campaign copy variants;
- visual prompt refinement;
- future video/image transformations if available in the selected API.

### kling

Candidate external video-generation provider.

Use for:

- generating destination/product portal videos;
- creating campaign background clips;
- cinematic ad variants.

Needs connector/backend review before integration.

### higgsfield

Candidate external creative video provider.

Use for:

- social-style video variants;
- short-form campaign assets;
- creator-led visual treatments.

Needs connector/backend review before integration.

### mcp

MCP should be treated as orchestration, not as a visual provider by itself.

Use for:

- routing to connected tools;
- fetching campaign assets;
- pushing exports to storage;
- connecting CRM/landing/reporting systems;
- coordinating provider jobs.

## Implementation Rule

Do not add provider-specific logic directly inside the render loop.

Recommended shape:

- `provider: local` remains default and must keep working without credentials.
- Remote providers must be optional.
- Remote providers need explicit consent copy.
- Provider calls should return normalized assets for the existing canvas composer.
- MUPI/live camera providers must be reviewed separately for privacy, GPU cost and hosting.

## Next Step

After v1.2 mobile QA, choose one provider path to prototype:

1. OpenAI/OpenAI-compatible asset generation for portal media.
2. Kling/Higgsfield external video asset generation.
3. MCP orchestration for campaign publishing and reporting.
4. blinkface-style live GPU backend for the future MUPI/live module.
