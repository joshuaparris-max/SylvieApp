export const STORAGE_KEYS = {
  stars: 'sylvieapp-stars',
  farm: 'sylvieapp-farm',
  fairy: 'sylvieapp-fairy',
  outfit: 'sylvieapp-outfit',
  drawing: 'sylvieapp-drawing',
  builder: 'sylvieapp-builder',
  sort: 'sylvieapp-sort',
  parentSettings: 'sylvieapp-parent-settings',
  puzzle: 'sylvieapp-puzzle-progress',
}

export function safeParse(value, fallback) {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}
