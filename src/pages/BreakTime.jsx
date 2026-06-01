import { useEffect, useState } from 'react'
import PageCard from '../components/PageCard'

const prompts = [
  'Do 5 gentle jumps',
  'Pretend to fly like a fairy',
  'Stretch your arms like a rainbow',
  'Spin slowly like a princess',
  'Take 3 calm breaths',
  'Jump like a frog',
  'Swing your arms gently',
]

export default function BreakTime() {
  const [active, setActive] = useState(0)
  const [countdown, setCountdown] = useState(null)

  useEffect(() => {
    if (countdown == null) return undefined
    const interval = setInterval(() => {
      setCountdown((current) => {
        if (current === 1) {
          clearInterval(interval)
          return null
        }
        return current - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [countdown])

  const startTimer = () => {
    if (countdown != null) return
    setCountdown(10)
  }

  const nextPrompt = () => {
    setActive((current) => (current + 1) % prompts.length)
  }

  return (
    <div className="space-y-6 pb-10">
      <PageCard title="Trampoline & Swing Break" subtitle="Enjoy a calm movement break whenever Sylvie needs one." icon="🌈">
        <div className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-soft">
          <p className="text-sm text-slate-500">Movement break prompt</p>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">{prompts[active]}</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={nextPrompt}
              className="rounded-full bg-pastel-blue px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-pastel-blue/90"
            >
              New prompt
            </button>
            <button
              type="button"
              onClick={startTimer}
              className="rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
            >
              Start calm timer
            </button>
            <button
              type="button"
              onClick={() => setCountdown(null)}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
            >
              Done!
            </button>
          </div>
          <div className="mt-6 rounded-[2rem] bg-pastel-pink/70 p-5 text-center text-slate-700 shadow-sm">
            <p className="text-sm">Breathe like a soft breeze.</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{countdown != null ? countdown : 'Ready'}</p>
            <p className="mt-2 text-sm">{countdown != null ? 'Slow breaths until the timer ends.' : 'Press start to relax gently.'}</p>
          </div>
        </div>
      </PageCard>
    </div>
  )
}
