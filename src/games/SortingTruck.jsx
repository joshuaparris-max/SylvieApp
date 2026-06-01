import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { useAppState } from '../hooks/useAppState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'

const items = [
  { id: 'bottle', label: 'Bottle', bin: 'Recycling' },
  { id: 'paper', label: 'Paper', bin: 'Recycling' },
  { id: 'apple', label: 'Apple core', bin: 'Compost' },
  { id: 'leaf', label: 'Leaf pile', bin: 'Compost' },
  { id: 'wrapper', label: 'Wrapper', bin: 'Rubbish' },
  { id: 'tissue', label: 'Tissue', bin: 'Rubbish' },
]

const bins = ['Recycling', 'Compost', 'Rubbish']

const defaultTrash = {
  sorted: {},
  completedRounds: 0,
  celebrated: false,
}

export default function SortingTruck() {
  const { awardStars } = useAppState()
  const [trash, setTrash] = useLocalStorage(STORAGE_KEYS.trash, defaultTrash)
  const [selectedItem, setSelectedItem] = useState(null)
  const [message, setMessage] = useState('Sort each item into its gentle bin.')
  const safeTrash = {
    ...defaultTrash,
    ...trash,
    sorted: trash?.sorted && typeof trash.sorted === 'object' ? trash.sorted : {},
    completedRounds: Number(trash?.completedRounds || 0),
    celebrated: Boolean(trash?.celebrated),
  }

  const allSorted = items.every((item) => safeTrash.sorted[item.id] === item.bin)

  const sortItem = (itemId, bin) => {
    const item = items.find((entry) => entry.id === itemId)
    if (!item) return

    if (item.bin !== bin) {
      setMessage('Try a different bin.')
      return
    }

    const nextSorted = { ...safeTrash.sorted, [itemId]: bin }
    const completed = items.every((entry) => nextSorted[entry.id] === entry.bin)

    setTrash((current) => ({
      ...defaultTrash,
      ...current,
      sorted: nextSorted,
      completedRounds:
        completed && !current?.celebrated
          ? Number(current?.completedRounds || 0) + 1
          : Number(current?.completedRounds || 0),
      celebrated: completed ? true : Boolean(current?.celebrated),
    }))
    setSelectedItem(null)
    if (completed && !safeTrash.celebrated) {
      setMessage('Great sorting. You helped the earth!')
      awardStars(2, 'Sorting round finished.')
    } else {
      setMessage('Great sorting!')
    }
  }

  const newRound = () => {
    setTrash((current) => ({
      ...defaultTrash,
      ...current,
      sorted: {},
      celebrated: false,
    }))
    setMessage('Sort each item into its gentle bin.')
  }

  return (
    <div>
      <PageHeader title="Sorting Truck" eyebrow="Helpful sorting">
        <p>{message}</p>
      </PageHeader>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
          <h2 className="panel-title">Items</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {items.map((item) => {
                  const sorted = safeTrash.sorted[item.id]
              return (
                <button
                  key={item.id}
                  type="button"
                  draggable={!sorted}
                  className={`sort-item ${
                    selectedItem === item.id ? 'selected' : ''
                  } ${sorted ? 'sorted' : ''}`}
                  onClick={() => {
                    if (sorted) return
                    setSelectedItem(item.id)
                    setMessage(`Where should ${item.label} go?`)
                  }}
                  onDragStart={(event) => {
                    event.dataTransfer.setData('text/plain', item.id)
                    setSelectedItem(item.id)
                    setMessage(`Where should ${item.label} go?`)
                  }}
                  disabled={Boolean(sorted)}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
          <button type="button" className="btn-secondary mt-4 w-full" onClick={newRound}>
            New sorting round
          </button>
        </div>

        <div className="space-y-4">
          <section className="trash-road rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
            <div className={`friendly-truck ${allSorted ? 'drive' : ''}`} aria-hidden="true">
              <span className="truck-body" />
              <span className="truck-cab" />
              <span className="truck-wheel wheel-one" />
              <span className="truck-wheel wheel-two" />
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-3">
            {bins.map((bin) => (
              <button
                key={bin}
                type="button"
                className={`bin-card bin-${bin.toLowerCase()}`}
                onClick={() => selectedItem && sortItem(selectedItem, bin)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  sortItem(event.dataTransfer.getData('text/plain'), bin)
                }}
              >
                <span className="text-lg font-black">{bin}</span>
                <span className="mt-2 block text-sm">
                  {
                    items.filter((item) => safeTrash.sorted[item.id] === bin)
                      .length
                  }{' '}
                  sorted
                </span>
              </button>
            ))}
          </section>
        </div>
      </section>
    </div>
  )
}
