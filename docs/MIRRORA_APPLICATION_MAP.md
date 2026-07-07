# MIRRORA Application Map

Status: application planning only. No implementation yet.

| Concept | Sector | Problem Solved | User Flow | Technology Used | Final Reward | CTA | Difficulty | WOW Impact | Conversion Potential | Risks |
|---|---|---|---|---|---|---|---|---|---|---|
| MIRRORA Beauty Mirror | Beauty / cosmetics | Users cannot imagine how products fit their face. | Consent, capture/upload face, choose look, preview, save. | Landmarks, segmentation, overlay engine. | Beauty poster or look card. | Book makeup session. | Medium | High | High | Makeup accuracy, skin-tone sensitivity, no diagnosis. |
| MIRRORA Lipstick Try-On | Cosmetics | Lip color choice is uncertain online. | Capture face, choose shade, compare before/after, export. | Face landmarks, lip segmentation, color overlay. | Shade card. | Add shade to cart. | Medium | High | High | Lighting variance, color mismatch. |
| MIRRORA Optic Fit | Optics | Users want to see glasses on their own face. | Capture face, choose frame, adjust, save. | Landmarks, pose, accessory placement. | Frame fit card. | Reserve fitting. | Medium | High | High | Fit precision, no medical claims. |
| MIRRORA Headwear Studio | Fashion / headwear | Caps and hats are hard to evaluate online. | Face/head capture, choose cap/hat, adjust scale, export. | Landmarks, head pose, overlay. | Headwear poster. | Save product / buy. | Medium | Medium-high | High | Occlusion, hair variance. |
| MIRRORA Hair Identity Lab | Hair / barber | Users hesitate before changing hair style or color. | Upload selfie, select style/color, preview, save. | Segmentation, hair mask, generative or overlay prototype. | Hair look card. | Book appointment. | High | High | High | Unrealistic output, sensitive appearance expectations. |
| MIRRORA StoryFace Portal | Museums / events / education | Visitors want to become part of a story. | Consent, capture face, select story, avatar/narrative output. | Face alignment, avatar pipeline, optional narration. | Story portrait/video. | Share or continue experience. | High | Very high | Medium-high | Deepfake perception, consent/disclosure. |
| MIRRORA Face Souvenir | Events / retail | Experiences need a memorable takeaway. | Capture/upload face, select style, generate souvenir. | Local asset intake, template rendering, optional preprocessed 3D output. | PNG poster or short video. | Share / claim reward. | Low-medium | High | High | Storage and consent. |
| MIRRORA Scent Portrait | Perfume | Fragrance is abstract and hard to sell visually. | User chooses mood, face becomes visual scent portrait. | Face framing, style templates, visual overlays. | Scent identity card. | Try sample / buy. | Medium | High | Medium-high | Avoid personality or emotion claims. |
| MIRRORA Wellness Ritual | Wellness non-medical | Brands need calming interactive rituals without claims. | Consent, selfie, select ritual mood, visual transformation. | Face frame, visual effects, local export. | Ritual card. | Book session. | Low-medium | Medium | Medium | No health diagnosis, no stress detection. |
| MIRRORA Museum Narrator | Museum / culture | Visitors need personal connection with exhibits. | Capture face, choose exhibit, become narrator/avatar card. | Face capture, template, optional narration. | Museum narrator poster. | Continue tour. | Medium-high | High | Medium | Rights, minors, consent. |
| MIRRORA Tourism Avatar | Tourism | Destinations need shareable personalized previews. | Capture face, select destination, avatar appears in scene. | Face cutout, scene compositing, souvenir. | Travel avatar card. | Book route. | Medium | High | High | Image rights, realism expectations. |
| MIRRORA Retail VIP Pass | Retail / events | Brands need lead capture without friction. | Capture face, generate VIP pass, optional form. | Face crop, brand template, QR/coupon later. | VIP pass. | Join list / claim offer. | Low-medium | High | High | Lead consent, data minimization. |
| MIRRORA Fashion Identity | Fashion | Users want identity-driven outfit recommendations. | Upload/capture face, choose style archetype, output look. | Face framing, style templates, accessory overlay. | Fashion identity card. | Save look / wishlist. | Medium | High | High | Avoid sensitive attribute inference. |
| MIRRORA Auto Driver Persona | Automotive | Automotive campaigns need personalized configurator hooks. | Capture face, select model mood, create driver persona visual. | Face template, vehicle scene compositing. | Driver persona poster. | Book test drive. | Medium | Medium-high | Medium-high | No personality inference claims. |
| MIRRORA Real Estate Host Avatar | Premium real estate | Properties need personal host or guide experience. | Agent/user face becomes host card/video for tour. | Face image, template, optional avatar pipeline. | Host avatar card. | Request viewing. | High | High | Medium | Consent, likeness rights. |

## Prioritization

Best first candidates:

1. MIRRORA Face Souvenir: lowest technical risk and strongest foundation test.
2. MIRRORA Retail VIP Pass: clear conversion value and simple reward output.
3. MIRRORA Optic Fit: strong commercial use case, but requires overlay accuracy.
4. MIRRORA Lipstick Try-On: high value, but color accuracy and lighting need QA.

Highest-risk candidates:

- StoryFace Portal.
- Hair Identity Lab.
- Real Estate Host Avatar.

These need stronger consent, disclosure and technical validation.
