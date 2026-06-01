import { useState } from 'react'
import { useAppState } from '../hooks/useAppState'

export default function ParentGate({ children }) {
  const { settings } = useAppState()
  const [entered, setEntered] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [message, setMessage] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (passcode === settings.passcode) {
      setEntered(true)
      setMessage('')
      return
    }
    setMessage('That passcode did not match.')
  }

  if (entered) return children

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-lg rounded-lg border border-white/80 bg-white/90 p-5 shadow-soft"
    >
      <label className="block text-sm font-bold text-slate-700" htmlFor="passcode">
        Parent passcode
      </label>
      <input
        id="passcode"
        value={passcode}
        onChange={(event) => setPasscode(event.target.value)}
        className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 px-4 text-lg font-bold text-slate-900"
        inputMode="numeric"
        aria-describedby="passcode-help"
      />
      <p id="passcode-help" className="mt-2 text-sm text-slate-600">
        Default passcode is 2468.
      </p>
      {message ? <p className="mt-3 text-sm font-bold text-rose-700">{message}</p> : null}
      <button type="submit" className="btn-primary mt-4 w-full">
        Open settings
      </button>
    </form>
  )
}
