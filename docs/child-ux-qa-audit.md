# Child UX QA Audit

Date: 2026-06-04

This audit checks SylvieApp against the research guidance for a 4-year-old: short sessions, low clutter, large touch targets, picture-led interaction, simple language by default, and parent-only detail when needed.

## New Display Controls

Parent Settings now includes:

- App mode: Sylvie or Parent.
- Screen detail: Simple or Full.
- Reading support: Picture, Simple, or Full.
- Words: Simple or Richer.

These controls do not delete educational content. They hide or reveal it depending on the level chosen.

## Page QA

| Route | Child Suitability | Action Taken |
| --- | --- | --- |
| `/` | Strong visual identity, but the gallery and cards can become text-heavy. | Picture mode hides descriptions and summaries; cards remain visual and tappable. |
| `/things-sylvie-loves/:id` | Unique mini activities are suitable, but feedback and bridge prompts add reading load. | Picture mode hides bridge text; simple words shorten feedback; full/richer shows detail. |
| `/fairy-garden` | Suitable for open-ended 4-year-old play. Some decoration text is parent-readable. | Page header text now hides in Picture mode. |
| `/farm-adventure` | Suitable sequencing and pretend-care play. Some explanatory header copy is adult-like. | Page header text now hides in Picture mode. |
| `/princess-dress-up` | Suitable and visual after preview fix; option labels are manageable. | Page header text now hides in Picture mode; choices remain visible. |
| `/colouring-room` | Suitable, hands-on, and creative. Tool panels can be busy. | Existing Simple mode hides creative idea panels unless Full/Parent mode is used. |
| `/block-builder` | Suitable and highly aligned with Sylvie's interests. | Existing Simple mode hides prompt panels unless Full/Parent mode is used. |
| `/puzzle-play` | Suitable but slightly more cognitively structured. | Header copy hides in Picture mode; large choices remain. |
| `/sorting-truck` | Suitable classification activity. Text feedback is short. | Header copy hides in Picture mode. |
| `/trampoline-swing-break` | Suitable movement/regulation break. Very low text. | Header copy hides in Picture mode. |
| `/story-corner` | Valuable narrative language, but inherently text-heavy. | Header copy hides in Picture mode; full story text remains because this route is intentionally reading/co-reading. |
| `/calm-down` | Suitable regulation screen with minimal clutter. | Header copy hides in Picture mode. |
| `/parent-settings` | Adult-only. Text density is acceptable behind the parent gate. | Added display controls and parent summary fields. |

## Remaining Recommendations

- Add optional voice prompts so Sylvie does not need to read instructions.
- Add a per-page "picture-only" icon cue for activities that still rely on button text.
- Add local activity history to show which activity types Sylvie returns to.
- Continue replacing remaining reward language with narrative/local achievement language.
