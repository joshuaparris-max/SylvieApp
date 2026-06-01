import { useState } from 'react'
import ParentGate from '../components/ParentGate'
import PageCard from '../components/PageCard'

export default function ParentSettings({ parentSettings, setParentSettings, setStars }) {
  const [unlocked, setUnlocked] = useState(false)
  const [messageText, setMessageText] = useState(parentSettings.customMessage)
  const [storyPrompt, setStoryPrompt] = useState(parentSettings.customStoryPrompt)

  const handleSave = () => {
    setParentSettings((prev) => ({
      ...prev,
      customMessage: messageText,
      customStoryPrompt: storyPrompt,
    }))
  }

  const resetProgress = () => {
    setStars(0)
    window.localStorage.removeItem('sylvieapp-farm')
    window.localStorage.removeItem('sylvieapp-fairy')
    window.localStorage.removeItem('sylvieapp-outfit')
    window.localStorage.removeItem('sylvieapp-drawing')
    window.localStorage.removeItem('sylvieapp-builder')
    window.localStorage.removeItem('sylvieapp-sort')
    window.localStorage.removeItem('sylvieapp-puzzle-progress')
    setUnlocked(false)
    alert('Progress has been reset. SylvieApp is ready for fresh play.')
  }

  return (
    <div className="space-y-6 pb-10">
      {!unlocked ? (
        <ParentGate passcode={parentSettings.passcode} onUnlock={() => setUnlocked(true)} />
      ) : (
        <PageCard title="Parent Settings" subtitle="Gentle controls for Sylvie’s safe play world." icon="🔒">
          <div className="space-y-6 rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-sm font-medium text-slate-700">Sound mode</span>
                <select
                  value={parentSettings.soundsOn ? 'on' : 'off'}
                  onChange={(event) => setParentSettings((prev) => ({ ...prev, soundsOn: event.target.value === 'on' }))}
                  className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 outline-none"
                >
                  <option value="off">Off</option>
                  <option value="on">On</option>
                </select>
              </label>
              <label className="block rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-sm font-medium text-slate-700">Display mode</span>
                <select
                  value={parentSettings.mode}
                  onChange={(event) => setParentSettings((prev) => ({ ...prev, mode: event.target.value }))}
                  className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 outline-none"
                >
                  <option value="calm">Calm</option>
                  <option value="playful">Playful</option>
                </select>
              </label>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <label className="block text-sm font-medium text-slate-700">Custom encouragement message</label>
              <textarea
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none"
              />
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <label className="block text-sm font-medium text-slate-700">Custom story prompt</label>
              <textarea
                value={storyPrompt}
                onChange={(event) => setStoryPrompt(event.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleSave}
                className="rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
              >
                Save settings
              </button>
              <button
                type="button"
                onClick={resetProgress}
                className="rounded-full bg-pastel-pink px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-pastel-pink/90"
              >
                Reset progress
              </button>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
              <p>Movement break reminders: {parentSettings.movementBreakMinutes} minutes</p>
              <p className="mt-2">To change this setting, update the code in Parent Settings or add a new control.</p>
            </div>
          </div>
        </PageCard>
      )}
    </div>
  )
}
