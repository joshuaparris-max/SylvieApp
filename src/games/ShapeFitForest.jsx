import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'

const BEST_KEY = 'sylvieapp:shape-fit-best'
const LEVEL_KEY = 'sylvieapp:shape-fit-level'

const shapes = [
  { id: 'circle', label: 'Circle', color: '#38bdf8' },
  { id: 'square', label: 'Square', color: '#fb7185' },
  { id: 'triangle', label: 'Triangle', color: '#facc15' },
  { id: 'rectangle', label: 'Rectangle', color: '#86efac' },
  { id: 'star', label: 'Star', color: '#c4b5fd' },
]

function readNumber(key, fallback = 0) {
  try {
    return Number(localStorage.getItem(key) || fallback)
  } catch {
    return fallback
  }
}

function levelShapes(level) {
  return shapes.slice(0, level === 1 ? 3 : 5)
}

function makeRound(level) {
  const available = levelShapes(level)
  const answer = available[Math.floor(Math.random() * available.length)]
  const choices = [
    answer,
    ...available.filter((shape) => shape.id !== answer.id).sort(() => Math.random() - 0.5).slice(0, 2),
  ].sort(() => Math.random() - 0.5)
  return {
    answer,
    choices,
    rotated: level >= 3,
    rotation: level >= 3 ? [45, 60, 90][Math.floor(Math.random() * 3)] : 0,
    stamp: Date.now(),
  }
}

function ShapeGlyph({ shape, outline = false, rotated = 0 }) {
  return (
    <span
      className={`shape-glyph shape-${shape.id} ${outline ? 'outline' : ''}`}
      style={{ '--shape-color': shape.color, transform: `rotate(${rotated}deg)` }}
    />
  )
}

export default function ShapeFitForest() {
  const [level, setLevel] = useState(() => Math.min(3, Math.max(1, readNumber(LEVEL_KEY, 1))))
  const [round, setRound] = useState(() => makeRound(level))
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(() => readNumber(BEST_KEY))
  const [run, setRun] = useState(0)
  const [status, setStatus] = useState('ready')
  const [wrong, setWrong] = useState('')
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const schedule = (fn, delay) => {
    const timer = window.setTimeout(fn, delay)
    timers.current.push(timer)
  }

  const speak = (text) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
  }

  const nextRound = (nextLevel = level) => {
    setRound(makeRound(nextLevel))
    setStatus('ready')
    setWrong('')
  }

  const choose = (shape) => {
    if (status === 'correct') return
    if (shape.id !== round.answer.id) {
      setWrong(shape.id)
      schedule(() => setWrong(''), 700)
      return
    }
    const nextStreak = streak + 1
    const nextRun = run + 1
    const nextLevel = nextRun >= 3 ? Math.min(3, level + 1) : level
    setStreak(nextStreak)
    setBest(Math.max(best, nextStreak))
    setRun(nextRun >= 3 ? 0 : nextRun)
    setStatus('correct')
    speak(round.answer.label)
    try {
      localStorage.setItem(BEST_KEY, String(Math.max(best, nextStreak)))
      localStorage.setItem(LEVEL_KEY, String(nextLevel))
    } catch {
      // Optional persistence.
    }
    if (nextLevel !== level) setLevel(nextLevel)
    schedule(() => nextRound(nextLevel), 1300)
  }

  return (
    <div>
      <PageHeader title="Shape Fit Forest" eyebrow={`Level ${level}`}>
        <p>Fit the matching shape into the forest outline.</p>
      </PageHeader>

      <section className={`learning-game-stage shape-fit-forest ${status === 'correct' ? 'celebrate' : ''}`}>
        <div className="shape-hole" aria-label={`${round.answer.label} outline`}>
          <ShapeGlyph shape={round.answer} outline />
          {status === 'correct' ? <ShapeGlyph shape={round.answer} rotated={round.rotation} /> : null}
        </div>

        <div className="learning-choice-row">
          {round.choices.map((shape) => (
            <button
              key={`${round.stamp}-${shape.id}`}
              type="button"
              className={`shape-choice ${wrong === shape.id ? 'soft-wiggle' : ''}`}
              onClick={() => choose(shape)}
              aria-label={shape.label}
            >
              <ShapeGlyph shape={shape} rotated={shape.id === round.answer.id ? round.rotation : 0} />
            </button>
          ))}
        </div>

        <div className="learning-streak">
          <span>{streak} in a row!</span>
          <span>Best {best}</span>
        </div>
      </section>
    </div>
  )
}
