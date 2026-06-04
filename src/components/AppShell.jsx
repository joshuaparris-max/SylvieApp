import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import RewardToast from './RewardToast'
import StarCounter from './StarCounter'
import { movementPrompts, parentPlayPrompts, realWorldBridgePrompts } from '../data/content'
import { useAppState } from '../hooks/useAppState'

export default function AppShell() {
  const { settings, updateSettings } = useAppState()
  const location = useLocation()
  const [showMovementReminder, setShowMovementReminder] = useState(false)
  const [openingDismissedFor, setOpeningDismissedFor] = useState('')
  const [softStopFor, setSoftStopFor] = useState('')
  const [hardStopFor, setHardStopFor] = useState('')

  const isPlayRoute =
    location.pathname !== '/' && location.pathname !== '/parent-settings'
  const isParentMode = settings.audienceMode === 'parent'
  const isSimpleMode = settings.screenDetail === 'simple'
  const showOpeningRitual =
    isPlayRoute && isParentMode && openingDismissedFor !== location.pathname
  const showSoftStop = isPlayRoute && softStopFor === location.pathname
  const showHardStop = isPlayRoute && hardStopFor === location.pathname

  useEffect(() => {
    const minutes = Number(settings.movementBreakMinutes || 20)
    const timeout = window.setTimeout(
      () => setShowMovementReminder(true),
      minutes * 60 * 1000,
    )

    return () => window.clearTimeout(timeout)
  }, [settings.movementBreakMinutes, location.pathname])

  useEffect(() => {
    if (!isPlayRoute) {
      return undefined
    }

    const softMinutes = Number(settings.sessionSoftStopMinutes || 12)
    const hardMinutes = Number(settings.sessionHardStopMinutes || 15)
    const path = location.pathname
    const softTimer = window.setTimeout(
      () => setSoftStopFor(path),
      softMinutes * 60 * 1000,
    )
    const hardTimer = window.setTimeout(
      () => setHardStopFor(path),
      hardMinutes * 60 * 1000,
    )

    return () => {
      window.clearTimeout(softTimer)
      window.clearTimeout(hardTimer)
    }
  }, [
    isPlayRoute,
    location.pathname,
    settings.sessionHardStopMinutes,
    settings.sessionSoftStopMinutes,
  ])

  const playPrompt =
    parentPlayPrompts[Math.abs(location.pathname.length) % parentPlayPrompts.length]
  const bridgePrompt =
    realWorldBridgePrompts[Math.abs(location.pathname.length) % realWorldBridgePrompts.length]
  const movementPrompt =
    movementPrompts[Math.abs(location.pathname.length) % movementPrompts.length]

  return (
    <div
      className={`app-bg min-h-screen ${
        settings.visualMode === 'playful' ? 'mode-playful' : 'mode-calm'
      } ${isSimpleMode ? 'mode-simple' : 'mode-full'}`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-3 py-4 sm:px-5 lg:px-6">
        <header className="sticky top-0 z-30 mb-4 rounded-lg border border-white/80 bg-white/90 p-3 shadow-soft backdrop-blur backdrop-saturate-150">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/" className="group flex items-center gap-3" aria-label="Go to home">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-rose-100 text-xl font-black text-rose-700 shadow-sm">
                S
              </span>
              <span>
                <span className="block text-xl font-black text-slate-950">
                  SylvieApp
                </span>
                <span className="block text-sm font-semibold text-slate-600">
                  A gentle magical play world
                </span>
              </span>
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <div className="mode-switch" aria-label="Choose app mode">
                {[
                  ['sylvie', 'Sylvie'],
                  ['parent', 'Parent'],
                ].map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    className={settings.audienceMode === mode ? 'active' : ''}
                    onClick={() => updateSettings({ audienceMode: mode })}
                    aria-pressed={settings.audienceMode === mode}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <StarCounter />
              <Link to="/calm-down" className="btn-calm" aria-label="Open Calm Down screen">
                Calm Down
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 pb-24">
          <Outlet />
        </main>
      </div>

      {showMovementReminder ? (
        <aside className="fixed bottom-4 right-4 z-40 w-[min(92vw,22rem)] rounded-lg border border-emerald-200 bg-white p-4 shadow-soft">
          <p className="text-sm font-bold text-slate-900">Gentle movement break?</p>
          <p className="mt-1 text-sm text-slate-600">{movementPrompt}</p>
          <div className="mt-3 flex gap-2">
            <Link
              to="/trampoline-swing-break"
              onClick={() => setShowMovementReminder(false)}
              className="btn-primary flex-1"
            >
              Go
            </Link>
            <button
              type="button"
              onClick={() => setShowMovementReminder(false)}
              className="btn-secondary flex-1"
            >
              Later
            </button>
          </div>
        </aside>
      ) : null}

      {showOpeningRitual ? (
        <aside className="fixed inset-x-3 bottom-4 z-40 mx-auto w-[min(94vw,34rem)] rounded-lg border border-indigo-100 bg-white p-4 shadow-soft">
          <p className="text-sm font-black uppercase text-indigo-700">Play together</p>
          <p className="mt-1 text-base font-bold text-slate-900">{playPrompt}</p>
          <p className="mt-1 text-sm text-slate-600">
            Aim for one small adventure, then show or make something away from the screen.
          </p>
          <button
            type="button"
            className="btn-primary mt-3 w-full"
            onClick={() => setOpeningDismissedFor(location.pathname)}
          >
            Start this little play
          </button>
        </aside>
      ) : null}

      {showSoftStop ? (
        <aside className="fixed bottom-4 left-4 z-40 w-[min(92vw,23rem)] rounded-lg border border-amber-200 bg-white p-4 shadow-soft">
          <p className="text-sm font-bold text-slate-900">Finish on a good bit?</p>
          <p className="mt-1 text-sm text-slate-600">{bridgePrompt}</p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="btn-secondary flex-1"
              onClick={() => setSoftStopFor('')}
            >
              One more minute
            </button>
            <Link to="/" className="btn-primary flex-1">
              Finish
            </Link>
          </div>
        </aside>
      ) : null}

      {showHardStop ? (
        <aside className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4">
          <div className="w-[min(94vw,28rem)] rounded-lg border border-emerald-100 bg-white p-5 text-center shadow-soft">
            <p className="text-lg font-black text-slate-950">Screen play is finished.</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{bridgePrompt}</p>
            <Link to="/" className="btn-primary mt-4 w-full">
              Back home
            </Link>
          </div>
        </aside>
      ) : null}

      <RewardToast />
    </div>
  )
}
