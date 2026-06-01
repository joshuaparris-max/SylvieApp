export const STORAGE_KEYS = {
  stars: 'sylvieapp:stars',
  settings: 'sylvieapp:settings',
  fairyGarden: 'sylvieapp:fairy-garden',
  farm: 'sylvieapp:farm',
  outfit: 'sylvieapp:outfit',
  drawings: 'sylvieapp:drawings',
  blocks: 'sylvieapp:blocks',
  puzzles: 'sylvieapp:puzzles',
  stories: 'sylvieapp:stories',
  trash: 'sylvieapp:trash',
}

export const PROGRESS_STORAGE_KEYS = [
  STORAGE_KEYS.stars,
  STORAGE_KEYS.fairyGarden,
  STORAGE_KEYS.farm,
  STORAGE_KEYS.outfit,
  STORAGE_KEYS.drawings,
  STORAGE_KEYS.blocks,
  STORAGE_KEYS.puzzles,
  STORAGE_KEYS.stories,
  STORAGE_KEYS.trash,
]

export function readLocalStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch (error) {
    console.warn(`Could not read localStorage key ${key}`, error)
    return fallback
  }
}

export function removeLocalStorage(key) {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.warn(`Could not remove localStorage key ${key}`, error)
  }
}
