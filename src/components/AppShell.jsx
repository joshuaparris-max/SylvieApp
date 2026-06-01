import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import RewardToast from './RewardToast'
import StarCounter from './StarCounter'
import { useAppState } from '../hooks/useAppState'

export default function AppShell() {
  const { settings } = useAppState()
  const location = useLocation()
  const [showMovementReminder, setShowMovementReminder] = useState(false)

  useEffect(() => {
    const minutes = Number(settings.movementBreakMinutes || 20)
    const timeout = window.setTimeout(
      () => setShowMovementReminder(true),
      minutes * 60 * 1000,
    )

    return () => window.clearTimeout(timeout)
  }, [settings.movementBreakMinutes, location.pathname])

  return (
    <div className={`app-bg min-h-screen ${settings.visualMode === 'playful' ? 'mode-playful' : 'mode-calm'}`}>
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

      <RewardToast />
    </div>
  )
}
