# Rubik render engine (`_shared/`)

Render motor for Rubik visual-experience and banner-pack previews driven by
a single per-client configuration.

## Files

| File | Purpose |
|---|---|
| `types.js` | JSDoc shape for `RubikClientConfig` and friends. |
| `normalize-rubik-config.js` | Converts AURUM-style four-hook specs into a `RubikClientConfig`. |
| `sandhouse-rubik-config.js` | Validated fixture for Sandhouse Inmobiliaria. |
| `rubik-config-registry.js` | `getRubikConfigBySlug`, `hasRubikConfig`, `listRubikConfigSlugs`. |
| `styles/rubik-preview.css` | Shared editorial styles (dark base, gold accent, serif/mono typography). |
| `renderers/render-visual-experience.js` | Visual Experience renderer (DOM). |
| `renderers/render-banner-pack.js` | Banner Pack overview renderer. |
| `renderers/render-banner-vertical.js` | 9:16 banner renderer at native 1080×1920. |
| `renderers/render-banner-horizontal.js` | 16:9 banner renderer at native 1920×1080. |
| `preview-router.js` | Slug + view detection, embed mode, fallback. |

## How to wire a client

1. Create `dynamic-motion-banner/<slug>/index.html` with:

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><Client> · Visual Experience · Rubik</title>
  <link rel="stylesheet" href="/dynamic-motion-banner/_shared/styles/rubik-preview.css">
</head>
<body data-rubik-slug="<slug>">
  <div id="rubik-root"></div>
  <script type="module">
    import { bootRubikPreview } from "/dynamic-motion-banner/_shared/preview-router.js";
    bootRubikPreview();
  </script>
</body>
</html>
```

2. Add the client's config import to `rubik-config-registry.js`.

## Embed mode

Append `?embed=1` to any URL. The badge and QA warnings panel disappear and
the layout trims chrome so AURUM can iframe the piece directly.
