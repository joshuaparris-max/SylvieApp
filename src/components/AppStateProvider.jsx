import { useCallback, useMemo, useRef, useState } from 'react'
import {
  AppStateContext,
  defaultSettings,
} from '../hooks/useAppState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  PROGRESS_STORAGE_KEYS,
  STORAGE_KEYS,
  removeLocalStorage,
} from '../utils/storage'

export default function AppStateProvider({ children }) {
  const [stars, setStars] = useLocalStorage(STORAGE_KEYS.stars, 0)
  const [settings, setSettings] = useLocalStorage(
    STORAGE_KEYS.settings,
    defaultSettings,
  )
  const [reward, setReward] = useState(null)
  const rewardTimer = useRef(null)

  const mergedSettings = useMemo(
    () => ({
      ...defaultSettings,
      ...settings,
      passcode: String(settings?.passcode || defaultSettings.passcode),
      soundsEnabled: Boolean(settings?.soundsEnabled),
      audienceMode: settings?.audienceMode === 'parent' ? 'parent' : 'sylvie',
      visualMode: ['calm', 'playful', 'dark'].includes(settings?.visualMode)
        ? settings.visualMode
        : 'calm',
      screenDetail: settings?.screenDetail === 'full' ? 'full' : 'simple',
      readingSupport: ['picture', 'simple', 'full'].includes(settings?.readingSupport)
        ? settings.readingSupport
        : defaultSettings.readingSupport,
      wordComplexity: settings?.wordComplexity === 'rich' ? 'rich' : 'simple',
      movementBreakMinutes: [5, 8, 10, 20, 30].includes(
        Number(settings?.movementBreakMinutes),
      )
        ? Number(settings.movementBreakMinutes)
        : defaultSettings.movementBreakMinutes,
      sessionSoftStopMinutes: [8, 10, 12, 15].includes(
        Number(settings?.sessionSoftStopMinutes),
      )
        ? Number(settings.sessionSoftStopMinutes)
        : defaultSettings.sessionSoftStopMinutes,
      sessionHardStopMinutes: [10, 12, 15, 20].includes(
        Number(settings?.sessionHardStopMinutes),
      )
        ? Number(settings.sessionHardStopMinutes)
        : defaultSettings.sessionHardStopMinutes,
      customEncouragements: Array.isArray(settings?.customEncouragements)
        ? settings.customEncouragements
        : defaultSettings.customEncouragements,
      customStoryPrompts: Array.isArray(settings?.customStoryPrompts)
        ? settings.customStoryPrompts
        : defaultSettings.customStoryPrompts,
    }),
    [settings],
  )

  const awardStars = useCallback(
    (amount = 1, reason = 'Lovely work') => {
      setStars((current) => Math.max(0, Number(current || 0) + amount))
      setReward({ amount, reason, id: Date.now() })

      window.clearTimeout(rewardTimer.current)
      rewardTimer.current = window.setTimeout(() => {
        setReward(null)
      }, 2200)
    },
    [setStars],
  )

  const updateSettings = useCallback(
    (patch) => {
      setSettings((current) => ({
        ...defaultSettings,
        ...current,
        ...patch,
      }))
    },
    [setSettings],
  )

  const resetProgress = useCallback(() => {
    PROGRESS_STORAGE_KEYS.forEach(removeLocalStorage)
    setStars(0)
    setReward({ amount: 0, reason: 'Progress reset', id: Date.now() })
  }, [setStars])

  const value = useMemo(
    () => ({
      stars: Number(stars || 0),
      settings: mergedSettings,
      reward,
      awardStars,
      resetProgress,
      updateSettings,
    }),
    [awardStars, mergedSettings, resetProgress, reward, stars, updateSettings],
  )

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}
