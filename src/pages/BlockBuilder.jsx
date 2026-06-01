import { useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'
import PageCard from '../components/PageCard'

const blockOptions = [
  { color: '#f8c7e6', label: 'Soft pink' },
  { color: '#d6ebff', label: 'Sky blue' },
  { color: '#c6f7d7', label: 'Mint green' },
  { color: '#ffe4b8', label: 'Sunny yellow' },
]

const snapSize = 40

export default function BlockBuilder() {
  const [blocks, setBlocks] = useLocalStorage(STORAGE_KEYS.builder, [])
  const [activeColor, setActiveColor] = useState(blockOptions[0].color)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const addBlock = () => {
    setBlocks((prev) => [
      ...prev,
      {
        id: Date.now(),
        color: activeColor,
        x: 20,
        y: 20 + prev.length * 45,
      },
    ])
  }

  const clearBuilder = () => setBlocks([])

  const randomTower = () => {
    const tower = Array.from({ length: 4 }, (_, index) => ({
      id: Date.now() + index,
      color: blockOptions[index % blockOptions.length].color,
      x: 60,
      y: 320 - index * 45,
    }))
    setBlocks(tower)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const id = event.dataTransfer.getData('text/plain')
    const area = event.currentTarget.getBoundingClientRect()
    const x = Math.round((event.clientX - area.left) / snapSize) * snapSize
    const y = Math.round((event.clientY - area.top) / snapSize) * snapSize
    setBlocks((prev) => prev.map((block) => (block.id.toString() === id ? { ...block, x, y } : block)))
  }

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData('text/plain', id)
  }

  const deleteBlock = () => {
    setBlocks((prev) => prev.filter((_, index) => index !== selectedIndex))
    setSelectedIndex(null)
  }

  const selectedBlock = selectedIndex != null ? blocks[selectedIndex] : null

  const gridLines = useMemo(() => Array.from({ length: 8 }), [])

  return (
    <div className="space-y-6 pb-10">
      <PageCard title="Block Builder" subtitle="Create a calm tower with colourful blocks." icon="🧱">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-soft">
            <div className="mb-4 flex flex-wrap gap-3">
              {blockOptions.map((option) => (
                <button
                  key={option.color}
                  type="button"
                  onClick={() => setActiveColor(option.color)}
                  className={`h-12 w-12 rounded-3xl border-2 ${activeColor === option.color ? 'border-slate-700' : 'border-white'}`}
                  style={{ backgroundColor: option.color }}
                  aria-label={`Choose ${option.label}`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={addBlock}
                className="rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
              >
                Add block
              </button>
              <button
                type="button"
                onClick={randomTower}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
              >
                Random tower
              </button>
              <button
                type="button"
                onClick={clearBuilder}
                className="rounded-full bg-pastel-pink px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-pastel-pink/90"
              >
                Clear all
              </button>
            </div>
            <div
              className="relative mt-5 min-h-[360px] overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-pastel-blue to-white p-4"
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop}
              aria-label="Block builder play area"
            >
              {gridLines.map((_, index) => (
                <div key={`h-${index}`} className="absolute left-0 right-0 h-px bg-white/80" style={{ top: `${index * 45}px` }} />
              ))}
              {gridLines.map((_, index) => (
                <div key={`v-${index}`} className="absolute top-0 bottom-0 w-px bg-white/80" style={{ left: `${index * 45}px` }} />
              ))}
              {blocks.map((block, index) => (
                <div
                  key={block.id}
                  draggable
                  onDragStart={(event) => handleDragStart(event, block.id)}
                  onClick={() => setSelectedIndex(index)}
                  className={`absolute flex h-11 w-20 cursor-grab items-center justify-center rounded-3xl shadow-lg transition ${selectedIndex === index ? 'ring-2 ring-violet-400' : ''}`}
                  style={{ backgroundColor: block.color, left: block.x, top: block.y }}
                >
                  <span className="text-sm text-slate-900">Block</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">Drag each block into the play area and let it snap to the grid. Tap a block to select it.</p>
          </div>
          <div className="rounded-[2rem] border border-white/80 bg-pastel-lavender/70 p-5 shadow-soft">
            <div className="rounded-[2rem] bg-white/90 p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Builder details</p>
              <p className="mt-3 text-slate-700">Saved blocks are kept for when Sylvie returns.</p>
              <p className="mt-2 text-sm text-slate-600">Tap a block, then press Delete to remove it.</p>
            </div>
            {selectedBlock ? (
              <div className="mt-5 space-y-3 rounded-[2rem] bg-white/90 p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Selected block</p>
                <p className="text-sm text-slate-700">Colour: <span className="font-medium">{selectedBlock.color}</span></p>
                <p className="text-sm text-slate-700">Position: {selectedBlock.x}, {selectedBlock.y}</p>
                <button
                  type="button"
                  onClick={deleteBlock}
                  className="mt-3 w-full rounded-full bg-pastel-pink px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-pastel-pink/90"
                >
                  Delete block
                </button>
              </div>
            ) : (
              <div className="mt-5 rounded-[2rem] bg-white/90 p-5 shadow-sm">
                <p className="text-sm text-slate-700">Select a block to delete it or change its colour.</p>
              </div>
            )}
          </div>
        </div>
      </PageCard>
    </div>
  )
}
