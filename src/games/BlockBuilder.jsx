import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { creativeChallenges, realWorldBridgePrompts } from '../data/content'
import { useAppState } from '../hooks/useAppState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'

const colors = ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#8b5cf6']
const gridSize = 8

function createBlock(index, color) {
  const x = index % gridSize
  const y = Math.floor(index / gridSize)
  return {
    id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${index}`,
    x,
    y,
    color,
    width: 1,
    height: 1,
  }
}

export default function BlockBuilder() {
  const { awardStars, settings } = useAppState()
  const [blocks, setBlocks] = useLocalStorage(STORAGE_KEYS.blocks, [])
  const [activeColor, setActiveColor] = useState(colors[0])
  const [challengeIndex, setChallengeIndex] = useState(0)
  const [selectedBlock, setSelectedBlock] = useState(null)
  const safeBlocks = Array.isArray(blocks)
    ? blocks.filter(
        (block) =>
          Number.isInteger(block?.x) &&
          Number.isInteger(block?.y) &&
          block.x >= 0 &&
          block.x < gridSize &&
          block.y >= 0 &&
          block.y < gridSize &&
          colors.includes(block.color),
      )
    : []
  const showCreativeIdeas =
    settings.audienceMode === 'parent' || settings.screenDetail === 'full'
  const showGrownUpGuidance = settings.audienceMode === 'parent'

  const addBlock = (index, color = activeColor) => {
    const nextBlock = createBlock(index, colors.includes(color) ? color : activeColor)
    setBlocks((current) => [
      ...(Array.isArray(current) ? current : []).filter(
        (block) => block.x !== nextBlock.x || block.y !== nextBlock.y,
      ),
      nextBlock,
    ])
  }

  const deleteBlock = () => {
    if (!selectedBlock) return
    setBlocks((current) =>
      (Array.isArray(current) ? current : []).filter(
        (block) => block.id !== selectedBlock,
      ),
    )
    setSelectedBlock(null)
  }

  const touchPlacedBlock = (block) => {
    if (block.color === activeColor) {
      setSelectedBlock(block.id)
      return
    }

    setBlocks((current) =>
      (Array.isArray(current) ? current : []).map((item) =>
        item.id === block.id ? { ...item, color: activeColor } : item,
      ),
    )
    setSelectedBlock(block.id)
  }

  const randomTower = () => {
    const tower = Array.from({ length: 7 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      x: 3 + (index % 2),
      y: 7 - index,
      color: colors[index % colors.length],
      width: 1,
      height: 1,
    }))
    setBlocks(tower)
    awardStars(1, 'A bright tower was built.')
  }

  const saveCreation = () => {
    setBlocks((current) => [...(Array.isArray(current) ? current : [])])
    awardStars(1, 'You saved a careful block idea.')
  }

  const nextChallenge = () => {
    setChallengeIndex((index) => (index + 1) % creativeChallenges.blocks.length)
  }

  return (
    <div>
      <PageHeader title="Block Builder" eyebrow="Snap and build">
        <p>Play with big colourful blocks and calm building ideas.</p>
      </PageHeader>

      <section className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
          <h2 className="panel-title">Blocks</h2>
          {showCreativeIdeas ? (
            <div className="mb-4 rounded-lg bg-amber-50 p-3 text-sm leading-6 text-slate-700">
              <strong className="block text-slate-900">Builder idea</strong>
              {creativeChallenges.blocks[challengeIndex]}
              <button type="button" className="btn-secondary mt-3 w-full" onClick={nextChallenge}>
                New idea
              </button>
            </div>
          ) : null}
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                draggable
                className={`block-swatch ${
                  activeColor === color ? 'selected' : ''
                }`}
                style={{ background: color }}
                onClick={() => setActiveColor(color)}
                onDragStart={(event) => {
                  event.dataTransfer.setData('text/plain', color)
                  setActiveColor(color)
                }}
                aria-label={`Choose block ${color}`}
              />
            ))}
          </div>
          <div className="mt-4 grid gap-2">
            <button type="button" className="btn-primary" onClick={randomTower}>
              Random tower
            </button>
            <button type="button" className="btn-secondary" onClick={saveCreation}>
              Save creation
            </button>
            <button type="button" className="btn-secondary" onClick={deleteBlock}>
              Delete selected
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setBlocks([])
                setSelectedBlock(null)
              }}
            >
              Clear all
            </button>
          </div>
        </div>

        <section className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
          <div className="builder-grid" aria-label="Block builder grid">
            {Array.from({ length: gridSize * gridSize }).map((_, index) => (
              <button
                key={index}
                type="button"
                className="builder-cell"
                onClick={() => addBlock(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  addBlock(index, event.dataTransfer.getData('text/plain') || activeColor)
                }}
                aria-label={`Build cell ${index + 1}`}
              />
            ))}

            {safeBlocks.map((block) => (
              <button
                key={block.id}
                type="button"
                className={`placed-block ${
                  selectedBlock === block.id ? 'selected' : ''
                }`}
                style={{
                  left: `${block.x * 12.5}%`,
                  top: `${block.y * 12.5}%`,
                  width: '12.5%',
                  height: '12.5%',
                  background: block.color,
                }}
                onClick={() => touchPlacedBlock(block)}
                aria-label="Placed block"
              />
            ))}
          </div>
          {showGrownUpGuidance ? (
            <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm leading-6 text-slate-700">
              <strong className="block text-slate-900">Show and tell</strong>
              {realWorldBridgePrompts[1]} Then tell someone what each colour is doing.
            </div>
          ) : null}
        </section>
      </section>
    </div>
  )
}
