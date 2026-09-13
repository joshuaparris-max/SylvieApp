# Podcast Integration TODO

**Decision:** Conditional — parent-controlled educational audio only.
**Topic bank:** children's stories, phonics/early literacy, nature/farm stories, calm audio, age-appropriate learning.

## TODO
- [ ] Add podcast/audio management to Parent Settings, not the unrestricted child UI.
- [ ] Maintain a small parent-reviewed whitelist of approved Spotify/audio items.
- [ ] If enabled, expose only a simple child-safe **🎧 Listen** control with no external browsing/search.
- [ ] Persist parent choices/favourites locally and avoid random unreviewed content.
- [ ] Use Spotify embeds/deep links only through parent-approved entries; do not assume autoplay.
- [ ] Never play podcast audio simultaneously with story/read-aloud/game audio.
- [ ] Preserve the existing no-child-facing-external-links safety model.
- [ ] Add parent-gate, audio-conflict, reduced-motion/a11y and persistence tests.

## Shared direction
Reuse selected **Josh Podcast Dock** mechanics while keeping all discovery and curation under parent control.
