# SylvieApp

SylvieApp is a calm, child-safe React and Vite play world for Sylvie. It uses original illustrations and themes, browser-local progress, React Router pages, and Tailwind/CSS styling.

Repository: https://github.com/joshuaparris-max/SylvieApp.git

## Current State

The app is a working local-first play world with multiple activities, parent settings, saved progress, and QA fixes for localStorage resilience and mobile/touch play.

See:

- [Status](docs/status.md)
- [Roadmap](docs/roadmap.md)
- [Research Implementation Roadmap](docs/ResearchImplementationRoadmap.md)
- [QA Log](docs/qa-log.md)
- [Content and Safety](docs/content-and-safety.md)
- [Development](docs/development.md)

## Feature Summary

- Home screen with large child-friendly navigation.
- Fairy Garden with blooming flowers, collectable stars, and unlockable decorations.
- Farm Adventure with planting, watering, harvesting, animal care, and farm decorations.
- Princess Dress-Up with original outfit themes and saved local outfit state.
- Colouring Room with 10 original pages, large colors, eraser, clear, local saves, and PNG download.
- Puzzle Play with matching, picture placement, and missing-piece puzzles.
- Block Builder with snap-grid building, drag/drop color blocks, delete, clear, save, and random tower.
- Sorting Truck with recycling, compost, rubbish bins, and a friendly original truck.
- Trampoline and Swing Break with movement prompts and a calm timer.
- Story Corner with short original interactive stories and custom parent prompts.
- Calm Down screen with breathing animation and gentle words.
- Parent Settings with passcode, reset, sounds toggle, visual mode, saved drawing management, messages, and movement reminder interval.
- Parent-only local backup and restore for stars, settings, drawings, creations, and game progress.

## Safety Model

SylvieApp avoids official copyrighted characters, franchise names, logos, music, images, voices, ads, external child links, login, purchases, and social sharing. Progress is local-only in the browser.

## Run Locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/
  data/
  games/
  hooks/
  pages/
  utils/
docs/
```

Main routes are defined in `src/App.jsx`; home cards and most activity copy live in `src/data/content.js`.
