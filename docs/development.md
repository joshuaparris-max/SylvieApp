# SylvieApp Development

## Stack

- React 19
- React Router 7
- Vite 8
- Tailwind CSS 3
- ESLint
- Browser `localStorage`

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Main Files

- `src/App.jsx`: route definitions.
- `src/data/content.js`: home sections, favorite pictures, options, prompts, palettes, and calm words.
- `src/data/stories.js`: story content.
- `src/components/AppStateProvider.jsx`: shared app state.
- `src/hooks/useLocalStorage.js`: persistence helper.
- `src/utils/storage.js`: storage resilience helpers.
- `src/games/`: activity screens.
- `src/pages/ParentSettings.jsx`: parent controls.

## Major Change Workflow

After each major update:

1. Run `npm run build` and verify it succeeds.
2. Run `npm run lint` if the change touches source code.
3. Smoke test the changed route on desktop and mobile widths.
4. Stage tracked files and commit with a clear message.
5. Push the commit to `origin/main`.
