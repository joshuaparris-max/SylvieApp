import { createContext, useContext } from 'react'

export const defaultSettings = {
  passcode: '2468',
  soundsEnabled: false,
  visualMode: 'calm',
  movementBreakMinutes: 20,
  customEncouragements: ['You are kind and brave.'],
  customStoryPrompts: [],
}

export const AppStateContext = createContext(null)

export function useAppState() {
  const context = useContext(AppStateContext)

  if (!context) {
    throw new Error('useAppState must be used inside AppStateProvider')
  }

  return context
}
