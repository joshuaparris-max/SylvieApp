import { useMemo, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'

const LEVEL_KEY = 'sylvieapp:memory-level'
const icons = ['apple', 'bee', 'star', 'leaf', 'dog']

function readLevel() {
  try {
    return Math.min(3, Math.max(1, Number(localStorage.getItem(LEVEL_KEY) || 1)))
  } catch {
    return 1
  }
}

function makeDeck(level) {
  const pairs = level + 2
  return icons
    .slice(0, pairs)
    .flatMap((icon) => [
      { id: `${icon}-a`, icon },
      { id: `${icon}-b`, icon },
    ])
    .sort(() => Math.random() - 0.5)
}

export default function MemoryMeadow() {
  const [level, setLevel] = useState(readLevel)
  const [deck, setDeck] = useState(() => makeDeck(level))
  const [open, setOpen] = useState([])
  const [matched, setMatched] = useState([])
  const lock = useRef(false)

  const pairCount = level + 2
  const foundCount = useMemo(
    () => new Set(matched.map((id) => deck.find((card) => card.id === id)?.icon)).size,
    [deck, matched],
  )
  const complete = foundCount === pairCount

  const reset = (nextLevel = level) => {
    setDeck(makeDeck(nextLevel))
    setOpen([])
    setMatched([])
    lock.current = false
  }

  const choose = (card) => {
    if (lock.current || open.includes(card.id) || matched.includes(card.id)) return
    const nextOpen = [...open, card.id]
    setOpen(nextOpen)
    if (nextOpen.length < 2) return

    const [firstId] = nextOpen
    const first = deck.find((item) => item.id === firstId)
    if (first?.icon === card.icon) {
      setMatched((current) => [...current, first.id, card.id])
      setOpen([])
      return
    }

    lock.current = true
    window.setTimeout(() => {
      setOpen([])
      lock.current = false
    }, 1500)
  }

  const stepUp = () => {
    const next = Math.min(3, level + 1)
    setLevel(next)
    try {
      localStorage.setItem(LEVEL_KEY, String(next))
    } catch {
      // Optional persistence.
    }
    reset(next)
  }

  return (
    <div>
      <PageHeader title="Memory Meadow" eyebrow={`Level ${level}`}>
        <p>Find the friendly matching pairs.</p>
      </PageHeader>

      <section className={`learning-game-stage memory-meadow ${complete ? 'celebrate' : ''}`}>
        <div className={`memory-grid level-${level}`}>
          {deck.map((card) => {
            const visible = open.includes(card.id) || matched.includes(card.id)
            return (
              <button
                key={card.id}
                type="button"
                className={`memory-card ${visible ? 'open' : ''} ${matched.includes(card.id) ? 'matched' : ''}`}
                onClick={() => choose(card)}
                aria-label={visible ? card.icon : 'hidden card'}
              >
                {visible ? <span className={`word-picture word-${card.icon}`}><span /></span> : <span className="memory-leaf" />}
              </button>
            )
          })}
        </div>

        <div className="memory-trophies" aria-label="Pairs found">
          {Array.from({ length: pairCount }, (_, index) => (
            <span key={index} className={index < foundCount ? 'found' : ''} />
          ))}
        </div>

        {complete ? (
          <div className="memory-complete">
            <button type="button" className="btn-primary" onClick={() => reset()}>
              Again
            </button>
            <button type="button" className="btn-secondary" onClick={stepUp} disabled={level >= 3}>
              Next level
            </button>
          </div>
        ) : null}
      </section>
    </div>
  )
}
