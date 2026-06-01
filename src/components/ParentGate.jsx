import { useState } from 'react'

export default function ParentGate({ passcode, onUnlock }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (code === passcode) {
      setError('')
      onUnlock()
    } else {
      setError('Incorrect code. Try again.')
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-soft backdrop-blur-sm">
      <h2 className="text-xl font-semibold text-slate-900">Parent passcode</h2>
      <p className="mt-2 text-sm text-slate-600">Enter the code to manage SylvieApp settings.</p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Passcode
          <input
            type="password"
            inputMode="numeric"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-300"
            aria-label="Parent passcode"
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="inline-flex rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-violet-600"
        >
          Unlock Settings
        </button>
      </form>
    </div>
  )
}
