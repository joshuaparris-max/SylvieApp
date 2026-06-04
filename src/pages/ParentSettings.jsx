import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import ParentGate from '../components/ParentGate'
import { coloringPages } from '../data/content'
import { useAppState } from '../hooks/useAppState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { readLocalStorage, STORAGE_KEYS } from '../utils/storage'

export default function ParentSettings() {
  const { settings, updateSettings, resetProgress } = useAppState()
  const [drawings, setDrawings] = useLocalStorage(STORAGE_KEYS.drawings, {})
  const [blocks] = useLocalStorage(STORAGE_KEYS.blocks, [])
  const [newMessage, setNewMessage] = useState('')
  const [newStoryPrompt, setNewStoryPrompt] = useState('')
  const [copyStatus, setCopyStatus] = useState('')

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

  const parentSummary = useMemo(() => {
    const stars = readLocalStorage(STORAGE_KEYS.stars, 0)
    const savedDrawings = savedDrawingNames.map((page) => page.name).join(', ') || 'none yet'
    const blockCount = Array.isArray(blocks) ? blocks.length : 0
    const puzzles = readLocalStorage(STORAGE_KEYS.puzzles, {})
    const stories = readLocalStorage(STORAGE_KEYS.stories, {})
    const trash = readLocalStorage(STORAGE_KEYS.trash, {})
    const puzzleCount =
      puzzles && typeof puzzles === 'object' && !Array.isArray(puzzles)
        ? Object.keys(puzzles).length
        : 0
    const storyCount =
      stories && typeof stories === 'object' && !Array.isArray(stories)
        ? Object.keys(stories).length
        : 0
    const sortedCount =
      trash && typeof trash === 'object' && !Array.isArray(trash)
        ? Object.values(trash).filter(Boolean).length
        : 0

    return [
      'SylvieApp local parent summary',
      `When: ${new Date().toLocaleString()}`,
      `Garden ideas/decorations earned: ${Number(stars || 0)}`,
      `Saved drawings: ${savedDrawings}`,
      `Block cells currently filled: ${blockCount}`,
      `Puzzle progress entries: ${puzzleCount}`,
      `Story progress entries: ${storyCount}`,
      `Sorting items completed: ${sortedCount}`,
      `App mode: ${settings.audienceMode === 'parent' ? 'Parent' : 'Sylvie'}`,
      `Screen detail: ${settings.screenDetail === 'full' ? 'full' : 'simple'}`,
      `Reading support: ${settings.readingSupport}`,
      `Word complexity: ${settings.wordComplexity === 'rich' ? 'rich' : 'simple'}`,
      `Movement reminder: every ${settings.movementBreakMinutes} minutes`,
      `Session cues: soft ${settings.sessionSoftStopMinutes} min, finish ${settings.sessionHardStopMinutes} min`,
      'Suggested next co-play: ask Sylvie to show one creation and tell the story of what she made.',
    ].join('\n')
  }, [
    blocks,
    savedDrawingNames,
    settings.audienceMode,
    settings.movementBreakMinutes,
    settings.readingSupport,
    settings.screenDetail,
    settings.sessionHardStopMinutes,
    settings.sessionSoftStopMinutes,
    settings.wordComplexity,
  ])

  const copyParentSummary = async () => {
    try {
      await navigator.clipboard.writeText(parentSummary)
      setCopyStatus('Copied summary.')
    } catch {
      setCopyStatus('Copy unavailable here.')
    }
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
              <p className="label-text">App mode</p>
              <div className="segmented">
                {[
                  ['sylvie', 'Sylvie'],
                  ['parent', 'Parent'],
                ].map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updateSettings({ audienceMode: mode })}
                    className={settings.audienceMode === mode ? 'active' : ''}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="label-text">Screen detail</p>
              <div className="segmented">
                {[
                  ['simple', 'Simple'],
                  ['full', 'Full'],
                ].map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updateSettings({ screenDetail: mode })}
                    className={settings.screenDetail === mode ? 'active' : ''}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="label-text">Reading support</p>
              <div className="segmented segmented-three">
                {[
                  ['picture', 'Picture'],
                  ['simple', 'Simple'],
                  ['full', 'Full'],
                ].map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updateSettings({ readingSupport: mode })}
                    className={settings.readingSupport === mode ? 'active' : ''}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="label-text">Words</p>
              <div className="segmented">
                {[
                  ['simple', 'Simple'],
                  ['rich', 'Richer'],
                ].map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updateSettings({ wordComplexity: mode })}
                    className={settings.wordComplexity === mode ? 'active' : ''}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
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
                <option value={5}>Every 5 minutes</option>
                <option value={8}>Every 8 minutes</option>
                <option value={10}>Every 10 minutes</option>
                <option value={20}>Every 20 minutes</option>
                <option value={30}>Every 30 minutes</option>
              </select>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="label-text" htmlFor="soft-stop">
                  Soft stop
                </label>
                <select
                  id="soft-stop"
                  className="input-field mt-2"
                  value={settings.sessionSoftStopMinutes}
                  onChange={(event) =>
                    updateSettings({ sessionSoftStopMinutes: Number(event.target.value) })
                  }
                >
                  <option value={8}>8 minutes</option>
                  <option value={10}>10 minutes</option>
                  <option value={12}>12 minutes</option>
                  <option value={15}>15 minutes</option>
                </select>
              </div>
              <div>
                <label className="label-text" htmlFor="hard-stop">
                  Finish cue
                </label>
                <select
                  id="hard-stop"
                  className="input-field mt-2"
                  value={settings.sessionHardStopMinutes}
                  onChange={(event) =>
                    updateSettings({ sessionHardStopMinutes: Number(event.target.value) })
                  }
                >
                  <option value={10}>10 minutes</option>
                  <option value={12}>12 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={20}>20 minutes</option>
                </select>
              </div>
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

          <section className="settings-panel lg:col-span-2">
            <h2 className="panel-title">Parent summary</h2>
            <p className="mb-3 text-sm leading-6 text-slate-600">
              Local-only notes for a grown-up, educator, or therapist conversation.
            </p>
            <pre className="max-h-72 overflow-auto rounded-lg bg-slate-950 p-4 text-sm leading-6 text-white">
              {parentSummary}
            </pre>
            <button type="button" className="btn-primary mt-3" onClick={copyParentSummary}>
              Copy summary
            </button>
            {copyStatus ? (
              <p className="mt-2 text-sm font-bold text-emerald-700">{copyStatus}</p>
            ) : null}
          </section>
        </div>
      </ParentGate>
    </div>
  )
}
