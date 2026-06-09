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

export function createLocalDataBackup() {
  const data = Object.fromEntries(
    Object.values(STORAGE_KEYS)
      .map((key) => [key, window.localStorage.getItem(key)])
      .filter(([, value]) => value !== null),
  )

  return {
    app: 'SylvieApp',
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  }
}

export function restoreLocalDataBackup(backup) {
  if (
    backup?.app !== 'SylvieApp' ||
    backup?.version !== 1 ||
    !backup.data ||
    typeof backup.data !== 'object'
  ) {
    throw new Error('This is not a valid SylvieApp backup file.')
  }

  const allowedKeys = new Set(Object.values(STORAGE_KEYS))
  let restoredCount = 0

  Object.entries(backup.data).forEach(([key, value]) => {
    if (allowedKeys.has(key) && typeof value === 'string') {
      window.localStorage.setItem(key, value)
      restoredCount += 1
    }
  })

  if (restoredCount === 0) {
    throw new Error('Backup file did not contain any recognized SylvieApp data.')
  }
}
