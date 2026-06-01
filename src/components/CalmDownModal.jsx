import { useEffect } from 'react'

export default function CalmDownModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const handle = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
      <div className="max-w-lg rounded-[2rem] border border-white/70 bg-white/95 p-8 text-center shadow-soft backdrop-blur">
        <div className="mb-5 text-5xl">✨</div>
        <h2 className="mb-3 text-2xl font-semibold text-slate-900">You are safe</h2>
        <p className="mx-auto mb-6 max-w-md text-sm leading-7 text-slate-600">
          Take a slow breath. God made you and loves you. You can try again when you are ready.
        </p>
        <div className="space-y-3">
          <div className="mx-auto h-40 w-40 rounded-full bg-gradient-to-br from-pastel-blue to-pastel-pink p-4 shadow-inner">
            <div className="h-full w-full rounded-full bg-white/70 animate-pulse" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-violet-600"
          >
            Done!
          </button>
        </div>
      </div>
    </div>
  )
}
