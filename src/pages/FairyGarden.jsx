import { useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'
import PageCard from '../components/PageCard'
import SparkleEffect from '../components/SparkleEffect'

const messages = [
  'You are kind.',
  'You are brave.',
  'You are loved.',
  'Great trying!',
]

export default function FairyGarden({ addStars, stars }) {
  const [garden, setGarden] = useLocalStorage(STORAGE_KEYS.fairy, {
    blooms: 0,
    sparkles: 0,
    unlocked: [],
  })
  const [complete, setComplete] = useState(false)

  const message = useMemo(() => messages[garden.unlocked.length] ?? 'A new fairy friend is here!', [garden.unlocked.length])

  const tapFlower = () => {
    setGarden((prev) => ({ ...prev, blooms: prev.blooms + 1 }))
  }

  const tapFairy = () => {
    setGarden((prev) => ({ ...prev, sparkles: prev.sparkles + 1 }))
  }

  const unlockMessage = () => {
    setGarden((prev) => {
      const nextIndex = prev.unlocked.length
      const nextMessages = nextIndex < messages.length ? [...prev.unlocked, messages[nextIndex]] : prev.unlocked
      if (nextIndex < messages.length) {
        addStars(1)
      }
      return { ...prev, unlocked: nextMessages }
    })
    if (garden.unlocked.length + 1 >= messages.length) {
      setComplete(true)
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <PageCard title="Fairy Garden" subtitle="Tap flowers and fairies to find gentle magic." icon="🌸">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-pastel-pink/70 p-6 shadow-soft">
          <SparkleEffect />
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={tapFlower}
              className="rounded-3xl bg-white/90 p-5 text-left shadow-lg transition hover:bg-white"
              aria-label="Tap flower to make it bloom"
            >
              <p className="text-3xl">🌼</p>
              <p className="mt-3 text-sm text-slate-700">Tap flowers to make them bloom</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Blooms: {garden.blooms}</p>
            </button>
            <button
              type="button"
              onClick={tapFairy}
              className="rounded-3xl bg-white/90 p-5 text-left shadow-lg transition hover:bg-white"
              aria-label="Tap fairy to make sparkles appear"
            >
              <p className="text-3xl">🧚‍♀️</p>
              <p className="mt-3 text-sm text-slate-700">Tap fairies to make sparkles appear</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Sparkles: {garden.sparkles}</p>
            </button>
          </div>
          <div className="mt-6 rounded-[2rem] border border-white/70 bg-white/90 p-5 text-center shadow-sm">
            <p className="text-sm text-slate-500">Gentle fairy message</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{message}</p>
            <button
              type="button"
              onClick={unlockMessage}
              className="mt-4 rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
            >
              Unlock a message
            </button>
            {complete && <p className="mt-3 text-sm text-green-700">All fairy messages are unlocked! ✨</p>}
          </div>
          <div className="mt-6 rounded-[2rem] bg-white/90 p-4 text-sm text-slate-600 shadow-sm">
            <p>Stars collected: {stars}</p>
            <p className="mt-1">Collect stars for kind, brave, and gentle play.</p>
          </div>
        </div>
      </PageCard>
    </div>
  )
}
