# SylvieApp Research Implementation Roadmap

Source research: `C:\dev\SylvieElias_AppDesign_Research.txt`, prepared 2026-06-04.

This roadmap translates the early-childhood design research into a practical upgrade plan for SylvieApp. Sylvie is 4 years and 3 months old, so the strongest design direction is short, playful, parent-inviting, movement-rich sessions with calm contingent feedback and clear bridges back into real-world play.

## Evidence Summary

| Research Finding | SylvieApp Design Implication |
|------------------|------------------------------|
| Four-year-olds benefit from 8-12 minute structured play windows. | Add session rituals, soft stops, and natural closing summaries. |
| Learning apps work best when active, meaningful, socially supported, and responsive. | Every activity should invite choice, parent talk, and specific feedback. |
| Under-5 UI needs large targets and low complexity. | Keep activity screens to roughly 4-6 clear interactive elements. |
| Movement breaks reduce sedentary accumulation and support regulation. | Prompt movement every 5-8 minutes in longer flows. |
| Extrinsic rewards can crowd out intrinsic motivation. | Prefer narrative achievements, show-and-tell, and effort language over points/streaks. |
| EYLF/NQF documentation helps show purpose and developmental alignment. | Add parent-facing "why this matters" notes per activity. |

## Product Goal

Make SylvieApp a calm, imaginative play world that strengthens creativity, language, emotional literacy, movement, and parent co-play without becoming overstimulating or reward-driven.

## Priority 1: Session Rituals and Boundaries

### 1. Add Opening Ritual

Before a play session starts, invite co-play:

```text
Choose one little adventure. You can show a grown-up when you finish.
```

Parent assist copy:

```text
Aim for 8-12 minutes. Ask one question, name one feeling, and finish with a real-world follow-up.
```

### 2. Add Soft Stop and Closing Summary

Target timing:

- Movement cue at 5-8 minutes.
- Soft stop at 12 minutes.
- Closing transition at 15 minutes.

Closing summary examples:

- "You made a garden. Show someone your favorite part."
- "You sorted carefully. Can you find recycling in the kitchen?"
- "You kept trying when it was tricky."

Acceptance criteria:

- No abrupt lockout.
- Parent can restart intentionally.
- Child receives a warm conclusion and real-world bridge.

## Priority 2: Parent Co-Play and EYLF Notes

### 3. Add Parent Peek-In Prompts

Each activity should include one optional parent-facing co-play cue:

- Fairy Garden: "Ask: what helped the flower grow?"
- Farm Adventure: "Name the animal and the action."
- Dress-Up: "Ask: how does this character feel?"
- Colouring Room: "Ask Sylvie to tell you about one color choice."
- Puzzle Play: "Model thinking aloud: I might try this piece."
- Sorting Truck: "Find a real recycling item together."

### 4. Add "Why This Matters" Notes

Add parent-only notes for each home card/activity:

- EYLF outcome links.
- Skill focus.
- Suggested adult phrase.
- Real-world bridge.

Example:

```text
Why this matters: Sorting supports early classification, language, and flexible thinking. Try saying, "What group does this belong in?"
```

### 5. Add Show-and-Tell Mode

After a saved drawing, block build, outfit, farm scene, or story:

- prompt Sylvie to show a grown-up
- provide one sentence starter
- let parent save the moment locally if desired

Avoid social sharing. Keep it local and relational.

## Priority 3: Feedback, Rewards, and Emotional Literacy

### 6. Replace Generic Praise With Informational Feedback

Prefer:

- "You tried another way."
- "You found a matching shape."
- "You used gentle colors."
- "You helped the truck sort compost."

Avoid overusing:

- "Perfect!"
- "Best ever!"
- "Keep your streak!"

### 7. Audit Star/Reward Language

Stars can remain if they are:

- local-only
- non-competitive
- not streak-based
- framed as story progress or decoration unlocks

Where possible, rename or frame rewards around:

- kindness
- trying again
- helping
- completing a story moment

### 8. Embed Natural Emotional Literacy

Add light-touch emotion language:

- "The puppy feels proud."
- "The farmer is frustrated. Let's breathe and try again."
- "The princess feels brave when she asks for help."

Keep it brief and natural, not clinical.

## Priority 4: Movement and Regulation

### 9. Add Movement Break System

Trigger after 5-8 minutes of continuous app use:

- "Stand up and reach for the sky."
- "Do five gentle jumps."
- "Shake your hands, then take one slow breath."
- "Swing your arms like a rainbow."

Acceptance criteria:

- Movement prompt can be turned off or adjusted by parent.
- Prompt does not shame the child.
- Prompt ends with re-entry or closing choice.

### 10. Improve Calm-Down Integration

Use the existing Calm Down screen as:

- a parent-triggered tool
- a transition after frustration
- a closing option after longer sessions

Do not overstate mindfulness evidence. Frame it as breathing and sensory grounding.

## Priority 5: Offline and Regional Use

### 11. Strengthen Offline Confidence

Document and test:

- all core activities work offline after first load or install
- saved drawings and progress remain local
- no external child-facing dependencies
- parent can reset data

### 12. Therapist/Educator Reporting Path

For NDIS or educator conversations, add parent export/summary fields:

- activities used
- child strengths observed
- frustration points
- favorite creations
- movement/calm prompts used

Keep this descriptive, not diagnostic.

## Evidence-Graded Implementation Checklist

| Priority | Task | Evidence |
|----------|------|----------|
| P0 | Session soft stop at 12 minutes and closing at 15 minutes | A: attention span and screen-time guidance |
| P0 | Parent co-play prompts | A: science of learning and AAP Five Cs |
| P1 | Movement prompts every 5-8 minutes | A/B: movement guidelines and regulation support |
| P1 | Informational feedback audit | A: contingent feedback research |
| P1 | Physical-world bridge prompts | B: play-based learning and transfer |
| P1 | Reward language redesign | B: Self-Determination Theory |
| P2 | EYLF "why this matters" notes | A: EYLF/NQF documentation alignment |
| P2 | Local parent summaries | B: caregiver/educator continuity |

## Release Order

1. Session rituals, timer cues, and real-world bridge prompts.
2. Parent peek-in prompts and activity-level EYLF notes.
3. Feedback/reward language audit.
4. Movement break and calm-down integration.
5. Parent summary/export path.

## Definition of Done

SylvieApp is research-aligned when a typical session:

- lasts about 8-12 minutes
- invites a parent into the play
- uses calm, specific feedback
- includes movement or regulation when needed
- links digital play back to real-world activity
- documents EYLF purpose for parents without crowding the child UI
