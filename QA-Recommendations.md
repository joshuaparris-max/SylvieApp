# SylvieApp QA Recommendations

This document records the QA audit findings for SylvieApp and the recommended updates to make the app more developmentally appropriate, co-play friendly, and accessible.

## Key Audit Findings
- The star/idea collection system is extrinsic and may shift focus to reward accumulation.
- There is no session timer or closing ritual.
- Emotional language is mostly isolated to the Calm Down page.
- Parent prompts are hidden behind a toggle and may be missed.
- Audio narration and accessibility supports are missing.
- Some text labels and icons are too small for preschoolers.

## Recommendations
1. Rework the idea collection system.
   - Replace numeric unlocking with narrative or collaborative achievements.
   - **Acceptance**: feature unlocks feel relational, not point-based.

2. Add a session timer and closing ritual.
   - After 10–12 minutes, invite the child to share creations with a caregiver.
   - Suggest an offline activity like making a real fairy garden.
   - **Acceptance**: the app offers an end-of-play transition automatically.

3. Embed emotion modelling in scenes.
   - Have characters express feelings and ask for help.
   - Include repair language in at least one scene.
   - **Acceptance**: at least one scene shows a character naming an emotion and solving a problem.

4. Surface parent prompts in the main interface.
   - Add prompts visible inside scenes rather than behind settings.
   - Encourage caregiver narration and real-world extension.
   - **Acceptance**: every scene includes at least one visible prompt for adults.

5. Add optional audio narration.
   - Provide Australian-accented audio for labels and icon descriptions.
   - **Acceptance**: tapping a label triggers audio narration.

## Implementation Notes
- Consider a simplified accessibility mode with larger icons and higher contrast.
- Ensure the Calm Down content remains easy to discover and use in the main flow.
- Limit the number of interactive targets to keep scenes calm and child-friendly.

## Suggested Roadmap
- `P1`: redesign unlock flow, add timer/ritual
- `P2`: add scene-based emotion modelling and parent prompts
- `P3`: add audio narration and accessibility enhancements

## Status
- [ ] Replace idea collection with narrative unlocking
- [ ] Add session timer and offline transition
- [ ] Add emotional modelling in scenes
- [ ] Add visible parent prompts in each scene
- [ ] Add optional audio narration
