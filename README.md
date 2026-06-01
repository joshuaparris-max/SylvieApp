# SylvieApp

SylvieApp is a calm, child-safe React + Vite play world made for Sylvie. It uses original CSS/SVG-style illustrations, localStorage progress, React Router pages, and Tailwind CSS styling.

The app is inspired by gentle play themes: fairies, farms, princess dress-up, colouring, puzzles, block building, rubbish sorting, movement breaks, stories, and calm breathing. It does not use official copyrighted characters, franchise names, logos, music, images, voices, ads, external child links, login, purchases, or social sharing.

## Features

- Home screen with large child-friendly navigation
- Fairy Garden with blooming flowers, collectable stars, and unlockable decorations
- Farm Adventure with planting, watering, harvesting, animal care, and farm decorations
- Princess Dress-Up with original outfit themes and saved local outfit state
- Colouring Room with 10 original pages, large colours, eraser, clear, local saves, and PNG download
- Puzzle Play with matching, picture placement, and missing-piece puzzles
- Block Builder with snap-grid building, drag/drop colour blocks, delete, clear, save, and random tower
- Trash Truck Sorter with recycling, compost, rubbish bins, and a friendly original truck
- Trampoline & Swing Break with movement prompts and a calm timer
- Story Corner with short original interactive stories and custom parent prompts
- Parent Settings with passcode, reset, sounds toggle, visual mode, saved drawing management, messages, and movement reminder interval
- Calm Down screen with breathing animation and gentle words

## Local Development

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Production Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## GitHub Setup

From the project folder:

```bash
git init
git add .
git commit -m "Build SylvieApp"
git branch -M main
git remote add origin https://github.com/joshuaparris-max/SylvieApp.git
git push -u origin main
```

If the remote already exists locally, use:

```bash
git remote set-url origin https://github.com/joshuaparris-max/SylvieApp.git
git push -u origin main
```

## Vercel Deployment

1. Import the GitHub repository into Vercel.
2. Use the Vite defaults:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
3. Deploy.

## Parent Settings

The default parent passcode is `2468`. Settings and progress are stored only in the browser using localStorage.

Stored data includes stars, farm progress, outfit state, saved drawings, block creations, puzzle progress, story progress, sorting progress, and parent settings.

## Project Structure

```text
src/
  components/
  data/
  games/
  hooks/
  pages/
  utils/
  assets/
```

## Safety Notes

- No child-facing external links
- No ads
- No accounts
- No purchases
- No social sharing
- Sounds are off by default
- Rewards are gentle and non-pressuring
- All characters, scenes, and illustrations are original
