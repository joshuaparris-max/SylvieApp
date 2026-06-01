import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import ParentGate from '../components/ParentGate'
import { coloringPages } from '../data/content'
import { useAppState } from '../hooks/useAppState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'

export default function ParentSettings() {
  const { settings, updateSettings, resetProgress } = useAppState()
  const [drawings, setDrawings] = useLocalStorage(STORAGE_KEYS.drawings, {})
  const [newMessage, setNewMessage] = useState('')
  const [newStoryPrompt, setNewStoryPrompt] = useState('')

  const savedDrawingNames = useMemo(
    () =>
      coloringPages.filter(
        (page) => Array.isArray(drawings[page.id]) && drawings[page.id].some(Boolean),
      ),
    [drawings],
  )

  const addMessage = (event) => {
    event.preventDefault()
    const trimmed = newMessage.trim()
    if (!trimmed) return
    updateSettings({
      customEncouragements: [...settings.customEncouragements, trimmed].slice(-8),
    })
    setNewMessage('')
  }

  const addStoryPrompt = (event) => {
    event.preventDefault()
    const trimmed = newStoryPrompt.trim()
    if (!trimmed) return
    updateSettings({
      customStoryPrompts: [...settings.customStoryPrompts, trimmed].slice(-6),
    })
    setNewStoryPrompt('')
  }

  const removeDrawing = (id) => {
    setDrawings((current) => {
      const next = { ...current }
      delete next[id]
      return next
    })
  }

  return (
    <div>
      <PageHeader title="Parent Settings" eyebrow="Grown-up area">
        <p>Local settings only. No login, ads, purchases, or child-facing links.</p>
      </PageHeader>

      <ParentGate>
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="settings-panel">
            <h2 className="panel-title">Calm controls</h2>
            <label className="toggle-row">
              <span>Sounds</span>
              <input
                type="checkbox"
                checked={settings.soundsEnabled}
                onChange={(event) =>
                  updateSettings({ soundsEnabled: event.target.checked })
                }
              />
            </label>
            <div className="mt-4">
              <p className="label-text">Visual mode</p>
              <div className="segmented">
                {['calm', 'playful'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updateSettings({ visualMode: mode })}
                    className={settings.visualMode === mode ? 'active' : ''}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <label className="label-text" htmlFor="movement">
                Movement reminders
              </label>
              <select
                id="movement"
                className="input-field mt-2"
                value={settings.movementBreakMinutes}
                onChange={(event) =>
                  updateSettings({ movementBreakMinutes: Number(event.target.value) })
                }
              >
                <option value={10}>Every 10 minutes</option>
                <option value={20}>Every 20 minutes</option>
                <option value={30}>Every 30 minutes</option>
              </select>
            </div>
          </section>

          <section className="settings-panel">
            <h2 className="panel-title">Passcode</h2>
            <label className="label-text" htmlFor="new-passcode">
              Parent passcode
            </label>
            <input
              id="new-passcode"
              className="input-field mt-2"
              value={settings.passcode}
              onChange={(event) => updateSettings({ passcode: event.target.value })}
            />
            <button type="button" className="btn-warning mt-5 w-full" onClick={resetProgress}>
              Reset saved progress
            </button>
          </section>

          <section className="settings-panel">
            <h2 className="panel-title">Encouragement messages</h2>
            <form onSubmit={addMessage} className="flex flex-col gap-2 sm:flex-row">
              <input
                className="input-field flex-1"
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
                placeholder="Add a kind message"
              />
              <button type="submit" className="btn-primary">
                Add
              </button>
            </form>
            <ul className="mt-4 space-y-2">
              {settings.customEncouragements.map((message) => (
                <li key={message} className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-slate-700">
                  {message}
                </li>
              ))}
            </ul>
          </section>

          <section className="settings-panel">
            <h2 className="panel-title">Custom story prompts</h2>
            <form onSubmit={addStoryPrompt} className="flex flex-col gap-2 sm:flex-row">
              <input
                className="input-field flex-1"
                value={newStoryPrompt}
                onChange={(event) => setNewStoryPrompt(event.target.value)}
                placeholder="Add a gentle story idea"
              />
              <button type="submit" className="btn-primary">
                Add
              </button>
            </form>
            <ul className="mt-4 space-y-2">
              {settings.customStoryPrompts.map((prompt) => (
                <li key={prompt} className="rounded-lg bg-sky-50 px-3 py-2 text-sm text-slate-700">
                  {prompt}
                </li>
              ))}
            </ul>
          </section>

          <section className="settings-panel lg:col-span-2">
            <h2 className="panel-title">Saved drawings</h2>
            {savedDrawingNames.length ? (
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {savedDrawingNames.map((page) => (
                  <div
                    key={page.id}
                    className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2"
                  >
                    <span className="font-bold text-slate-700">{page.name}</span>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => removeDrawing(page.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-600">No saved drawings yet.</p>
            )}
          </section>
        </div>
      </ParentGate>
    </div>
  )
}
