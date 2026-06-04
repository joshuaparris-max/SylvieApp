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

## Appendix: Audit & Research Excerpts
### QA Audit for Child Apps (relevant SylvieApp findings)
- SylvieApp delights with imaginative play and fosters emotional language; however the star-collection unlocking can shift attention to rewards.
- Strengths: world map and scene art are cohesive; scenes like Fairy Garden, Farm, Princess Room, Trampoline and Wand Maker offer interactive items and encourage imagination; Calm Down page guides belly breathing and supportive phrases.
- Missing supports: no session timer or closing ritual; star-collection unlocking is extrinsic and may foster compliance rather than enjoyment; emotional language is mainly on the Calm Down page rather than embedded in scenes; parent prompts are hidden behind a toggle and may be missed.
- Recommendations excerpt: remove or redesign star/idea collection unlocking to emphasize exploration; integrate emotion modelling within scenes; add visible scene-based parent prompts; implement a session timer and natural closing ritual; provide optional audio narration.

### SylvieElias_AppDesign_Research (relevant SylvieApp findings)
- Screen time and session length: 4-year-olds should target 8–12 minute sessions with a soft stop at 15 minutes and a natural closing ritual; avoid autoplay next-session mechanics.
- Reward design principles: use informational praise over evaluative praise; avoid variable-ratio reward schedules; completion rewards should be narrative or social (“show a parent”); no shame mechanics.
- Four Pillars of Learning: Active Involvement, Contingent Feedback, Meaningful Experiences, Social Interaction.
- UI/UX guidance: limit to 4–6 interactive elements for 4–5-year-olds; high contrast for core interactive elements; audio feedback should be immediate and warm; movement breaks every 5–8 minutes.
- EYLF alignment: Outcome 1 Identity, Outcome 3 Wellbeing, Outcome 4 Learning, Outcome 5 Communication, and Outcome 2 Community through co-play prompts and parent involvement.

### Evidence-based guidance for SylvieApp
- Maintain calm, child-led play by keeping scenes simple and avoiding hidden parent supports.
- Embed emotional literacy naturally: characters can name feelings and show repair without excessive commentary.
- Make parent prompts visible inside play scenes and invite caregiver narration as part of the experience.
- Ensure the app supports intrinsic motivation through narrative unlocking and relational achievements rather than numeric stars.
