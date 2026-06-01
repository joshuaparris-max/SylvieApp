import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { movementPrompts } from '../data/content'
import { useAppState } from '../hooks/useAppState'

export default function TrampolineSwingBreak() {
  const { awardStars } = useAppState()
  const [promptIndex, setPromptIndex] = useState(0)
  const [seconds, setSeconds] = useState(30)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!running || seconds <= 0) return undefined
    const timer = window.setTimeout(() => setSeconds((current) => current - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [running, seconds])

  const nextPrompt = () => {
    setPromptIndex((current) => (current + 1) % movementPrompts.length)
    setSeconds(30)
    setRunning(false)
    setDone(false)
  }

  const startTimer = () => {
    if (seconds <= 0) {
      setSeconds(30)
      setDone(false)
    }
    setRunning(true)
  }

  const finish = () => {
    if (!done) {
      awardStars(1, 'Movement break finished.')
      setDone(true)
    }
    setRunning(false)
  }

  return (
    <div>
      <PageHeader title="Trampoline & Swing Break" eyebrow="Gentle movement">
        <p>{movementPrompts[promptIndex]}</p>
      </PageHeader>

      <section className="mx-auto max-w-3xl rounded-lg border border-white/80 bg-white/90 p-5 text-center shadow-soft">
        <div className="movement-scene" aria-hidden="true">
          <span className="trampoline" />
          <span className="swing-frame" />
          <span className="swing-seat" />
          <span className="rainbow-line" />
        </div>
        <p className="mt-5 text-6xl font-black text-slate-900">{seconds}</p>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
          Calm timer
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-4">
          <button type="button" className="btn-primary" onClick={startTimer}>
            {seconds <= 0 ? 'Restart' : 'Start'}
          </button>
          <button type="button" className="btn-secondary" onClick={() => setRunning(false)}>
            Pause
          </button>
          <button type="button" className="btn-secondary" onClick={nextPrompt}>
            New prompt
          </button>
          <button type="button" className="btn-calm" onClick={finish}>
            Done!
          </button>
        </div>
      </section>
    </div>
  )
}
