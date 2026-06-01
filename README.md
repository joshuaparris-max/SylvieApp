# SylvieApp

SylvieApp is a gentle, child-safe React + Vite web app designed for a magical play world for Sylvie. It includes calm games, imaginative activities, soft pastel styling, and local progress saving.

## Features

- React + Vite + Tailwind CSS
- React Router page navigation
- Soft pastel design and rounded touch targets
- Local storage for farm progress, star rewards, drawings, and more
- Child-friendly sections: Fairy Garden, Farm Adventure, Dress-Up, Colouring Room, Puzzle Play, Block Builder, Trash Sorter, Movement Breaks, Story Corner, and Parent Settings
- No ads, no login, no external child-facing links, and no branded copyrighted assets

## Quick Start

```bash
npm install
npm run dev
```

Open the app at `http://localhost:5173`.

## Build for Production

```bash
npm run build
```

If you want to preview the production build locally:

```bash
npm run preview
```

## Deploy to GitHub and Vercel

1. Commit the project to GitHub.
2. Connect your repository to Vercel.
3. Use the following build settings if prompted:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
4. Vercel will automatically deploy the site after you push changes.

## Project Structure

```
src/
  components/
  pages/
  data/
  hooks/
  utils/
  assets/
```

## Notes

- The app is built for mobile-first use with large tappable buttons and calm animations.
- Parent settings are protected by a simple passcode stored in local storage.
- Custom encouragement messages and story prompts can be added in Parent Settings.
