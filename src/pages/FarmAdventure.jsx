import { useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'
import PageCard from '../components/PageCard'

export default function FarmAdventure({ addStars }) {
  const [farm, setFarm] = useLocalStorage(STORAGE_KEYS.farm, {
    seeds: 0,
    watered: 0,
    harvested: 0,
    eggs: 0,
    decorated: false,
  })
  const [message, setMessage] = useState('')

  const handleAction = (action) => {
    setFarm((prev) => {
      const next = { ...prev }
      if (action === 'plant') next.seeds += 1
      if (action === 'water') next.watered += 1
      if (action === 'harvest' && prev.watered > 0) next.harvested += 1
      if (action === 'collect') next.eggs += 1
      if (action === 'decorate') next.decorated = true
      return next
    })
    if (action === 'plant' || action === 'harvest' || action === 'collect') {
      addStars(1)
    }
    setMessage('Nice work! Your farm is growing gently.')
  }

  const progressText = useMemo(() => {
    if (farm.decorated) return 'Your tiny farm sparkles with caring touches.'
    if (farm.harvested > 0) return 'Your farm is ready to decorate with extra love.'
    return 'Plant seeds and water them to grow cheerful vegetables.'
  }, [farm.decorated, farm.harvested])

  return (
    <div className="space-y-6 pb-10">
      <PageCard title="Farm Adventure" subtitle="Grow a cosy farm with friendly animals." icon="🐄">
        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4 rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-soft">
            <p className="text-sm text-slate-600">Touch each action to help the farm.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleAction('plant')}
                className="rounded-3xl bg-pastel-green/80 px-4 py-5 text-left shadow-sm transition hover:bg-pastel-green"
              >
                <p className="text-3xl">🌱</p>
                <p className="mt-3 font-semibold text-slate-900">Plant seeds</p>
              </button>
              <button
                type="button"
                onClick={() => handleAction('water')}
                className="rounded-3xl bg-pastel-blue/80 px-4 py-5 text-left shadow-sm transition hover:bg-pastel-blue"
              >
                <p className="text-3xl">💧</p>
                <p className="mt-3 font-semibold text-slate-900">Water plants</p>
              </button>
              <button
                type="button"
                onClick={() => handleAction('harvest')}
                className="rounded-3xl bg-pastel-peach/80 px-4 py-5 text-left shadow-sm transition hover:bg-pastel-peach"
              >
                <p className="text-3xl">🥕</p>
                <p className="mt-3 font-semibold text-slate-900">Harvest vegetables</p>
              </button>
              <button
                type="button"
                onClick={() => handleAction('collect')}
                className="rounded-3xl bg-pastel-lavender/80 px-4 py-5 text-left shadow-sm transition hover:bg-pastel-lavender"
              >
                <p className="text-3xl">🥚</p>
                <p className="mt-3 font-semibold text-slate-900">Collect eggs</p>
              </button>
            </div>
            <button
              type="button"
              onClick={() => handleAction('decorate')}
              className="mt-3 w-full rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
            >
              Decorate the tiny farm
            </button>
            {message && <p className="mt-3 rounded-3xl bg-violet-50 p-3 text-sm text-slate-700">{message}</p>}
          </div>
          <div className="rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-soft">
            <p className="text-sm text-slate-500">Farm progress</p>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>Seeds planted: {farm.seeds}</li>
              <li>Times watered: {farm.watered}</li>
              <li>Harvests: {farm.harvested}</li>
              <li>Eggs collected: {farm.eggs}</li>
              <li>Decorated: {farm.decorated ? 'Yes' : 'Not yet'}</li>
            </ul>
            <p className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">{progressText}</p>
          </div>
        </div>
      </PageCard>
    </div>
  )
}
