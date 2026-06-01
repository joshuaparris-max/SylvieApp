import { useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'
import PageCard from '../components/PageCard'

const items = [
  { id: 'bottle', label: 'Bottle', type: 'recycling' },
  { id: 'apple', label: 'Apple core', type: 'compost' },
  { id: 'wrapper', label: 'Wrapper', type: 'rubbish' },
  { id: 'newspaper', label: 'Newspaper', type: 'recycling' },
]

const binNames = {
  recycling: 'Recycling',
  compost: 'Compost',
  rubbish: 'Rubbish',
}

export default function TrashSorter({ addStars }) {
  const [sorted, setSorted] = useLocalStorage(STORAGE_KEYS.sort, {})
  const [feedback, setFeedback] = useState('Drag each item into the correct bin.')
  const [finished, setFinished] = useState(false)

  const sortedCount = useMemo(() => Object.keys(sorted).length, [sorted])

  const handleDrop = (event, binType) => {
    event.preventDefault()
    const itemId = event.dataTransfer.getData('text/plain')
    const item = items.find((candidate) => candidate.id === itemId)
    if (!item) return
    setSorted((prev) => ({ ...prev, [itemId]: binType }))
    if (item.type === binType) {
      setFeedback('Great sorting!')
    } else {
      setFeedback('Nice effort — you can try again.')
    }
  }

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData('text/plain', id)
  }

  const completeSorting = () => {
    const correct = items.every((item) => sorted[item.id] === item.type)
    if (correct) {
      addStars(1)
      setFeedback('You helped the earth!')
      setFinished(true)
    } else {
      setFeedback('Some items need a different bin. Try again!')
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <PageCard title="Trash Truck Sorter" subtitle="Sort each item into the right bin." icon="🚛">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-soft">
            <div className="grid gap-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  draggable
                  onDragStart={(event) => handleDragStart(event, item.id)}
                  className="rounded-3xl bg-pastel-peach/80 px-4 py-4 text-left shadow-sm hover:bg-pastel-peach"
                >
                  <span className="block text-lg font-semibold text-slate-900">{item.label}</span>
                  <span className="text-sm text-slate-600">Drag me to a bin</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-[2rem] border border-white/80 bg-pastel-blue/60 p-5 shadow-soft">
            {Object.entries(binNames).map(([type, label]) => (
              <div
                key={type}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, type)}
                className="rounded-3xl border border-dashed border-slate-300 bg-white/90 p-5 text-center shadow-sm"
              >
                <p className="text-lg font-semibold text-slate-900">{label}</p>
                <p className="mt-2 text-sm text-slate-600">Drop items here</p>
                <div className="mt-3 min-h-[72px] space-y-2 text-slate-700">
                  {items.filter((item) => sorted[item.id] === type).map((item) => (
                    <div key={item.id} className="rounded-2xl bg-slate-50 px-3 py-2 text-sm">
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={completeSorting}
              className="w-full rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
            >
              Check my sorting
            </button>
            <p className="rounded-3xl bg-white/90 p-4 text-sm leading-6 text-slate-600">{feedback}</p>
            {finished && <p className="rounded-3xl bg-green-50 p-4 text-sm text-green-700">The truck drives across the screen with a happy wave!</p>}
          </div>
        </div>
      </PageCard>
    </div>
  )
}
