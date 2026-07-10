import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'

const BEST_KEY = 'sylvieapp:more-less-best'
const SUCCESS_KEY = 'sylvieapp:more-less-successes'

const meadowIcons = [
  { id: 'ladybug', color: '#fb7185' },
  { id: 'flower', color: '#f9a8d4' },
  { id: 'leaf', color: '#86efac' },
]

function readNumber(key) {
  try {
    return Number(localStorage.getItem(key) || 0)
  } catch {
    return 0
  }
}

function makeGroup(count, side) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${side}-${Date.now()}-${index}`,
    left: `${18 + ((index * 29 + side.length * 11) % 64)}%`,
    top: `${18 + ((index * 37 + side.length * 13) % 58)}%`,
  }))
}

function makeRound(previousPrompt = 'less') {
  const prompt = previousPrompt === 'more' ? 'less' : 'more'
  let left = 1 + Math.floor(Math.random() * 6)
  let right = 1 + Math.floor(Math.random() * 6)
  while (left === right) right = 1 + Math.floor(Math.random() * 6)
  const icon = meadowIcons[Math.floor(Math.random() * meadowIcons.length)]
  return {
    prompt,
    icon,
    left,
    right,
    answer: prompt === 'more' ? (left > right ? 'left' : 'right') : left < right ? 'left' : 'right',
    groups: {
      left: makeGroup(left, 'left'),
      right: makeGroup(right, 'right'),
    },
  }
}

function MeadowThing({ icon, style }) {
  return (
    <span className={`meadow-thing thing-${icon.id}`} style={{ ...style, '--thing-color': icon.color }}>
      <span />
    </span>
  )
}

function BasketSort({ onComplete }) {
  const [items] = useState(() =>
    [
      ...Array.from({ length: 3 }, (_, index) => ({ id: `bug-${index}`, type: 'bug' })),
      ...Array.from({ length: 2 }, (_, index) => ({ id: `flower-${index}`, type: 'flower' })),
    ].sort(() => Math.random() - 0.5),
  )
  const [sorted, setSorted] = useState({})
  const counts = Object.values(sorted).reduce(
    (acc, type) => ({ ...acc, [type]: (acc[type] || 0) + 1 }),
    {},
  )

  useEffect(() => {
    if (Object.keys(sorted).length === items.length) onComplete()
  }, [items.length, onComplete, sorted])

  const put = (item) => setSorted((current) => ({ ...current, [item.id]: item.type }))

  return (
    <div className="sorting-meadow">
      <div className="sort-scatter">
        {items.map((item) =>
          sorted[item.id] ? null : (
            <button key={item.id} type="button" className="sort-meadow-item" onClick={() => put(item)}>
              <MeadowThing icon={item.type === 'bug' ? meadowIcons[0] : meadowIcons[1]} />
            </button>
          ),
        )}
      </div>
      <div className="basket-row">
        <div className="meadow-basket">
          <span>bugs</span>
          <strong>{counts.bug || 0}</strong>
        </div>
        <div className="meadow-basket">
          <span>flowers</span>
          <strong>{counts.flower || 0}</strong>
        </div>
      </div>
    </div>
  )
}

export default function MoreOrLessMeadow() {
  const [round, setRound] = useState(() => makeRound())
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(() => readNumber(BEST_KEY))
  const [successes, setSuccesses] = useState(() => readNumber(SUCCESS_KEY))
  const [status, setStatus] = useState('ready')
  const [showAnswer, setShowAnswer] = useState(false)
  const [sortMode, setSortMode] = useState(false)
  const timers = useRef([])

  const unlockedSort = successes >= 10
  const celebrate = streak > 0 && streak % 5 === 0 && status === 'correct'

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const schedule = (fn, delay) => {
    const timer = window.setTimeout(fn, delay)
    timers.current.push(timer)
  }

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
  }

  const chime = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    ;[440, 554, 659].forEach((frequency, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = frequency
      gain.gain.setValueAtTime(0.001, ctx.currentTime + index * 0.07)
      gain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + index * 0.07 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.07 + 0.16)
      osc.connect(gain).connect(ctx.destination)
      osc.start(ctx.currentTime + index * 0.07)
      osc.stop(ctx.currentTime + index * 0.07 + 0.18)
    })
  }

  const chooseSide = (side) => {
    if (status === 'correct') return
    clearTimers()
    if (side !== round.answer) {
      setStatus('try')
      setShowAnswer(false)
      schedule(() => setShowAnswer(true), 1000)
      return
    }
    const nextStreak = streak + 1
    const nextSuccesses = successes + 1
    setStreak(nextStreak)
    setBest(Math.max(best, nextStreak))
    setSuccesses(nextSuccesses)
    setStatus('correct')
    chime()
    try {
      localStorage.setItem(BEST_KEY, String(Math.max(best, nextStreak)))
      localStorage.setItem(SUCCESS_KEY, String(nextSuccesses))
    } catch {
      // Optional persistence.
    }
    schedule(() => {
      setRound((current) => makeRound(current.prompt))
      setStatus('ready')
      setShowAnswer(false)
    }, 1300)
  }

  const sortComplete = () => {
    const nextSuccesses = successes + 1
    setSuccesses(nextSuccesses)
    setStreak((current) => current + 1)
    chime()
    try {
      localStorage.setItem(SUCCESS_KEY, String(nextSuccesses))
    } catch {
      // Optional persistence.
    }
  }

  return (
    <div>
      <PageHeader title="More or Less Meadow" eyebrow={round.prompt === 'more' ? 'More' : 'Less'}>
        <p>Compare two little meadow groups.</p>
      </PageHeader>

      <section className={`learning-game-stage more-less-meadow ${celebrate ? 'celebrate' : ''}`}>
        {unlockedSort ? (
          <div className="mode-switch meadow-mode-switch" aria-label="Choose meadow mode">
            <button type="button" className={!sortMode ? 'active' : ''} onClick={() => setSortMode(false)}>
              compare
            </button>
            <button type="button" className={sortMode ? 'active' : ''} onClick={() => setSortMode(true)}>
              sort
            </button>
          </div>
        ) : null}

        {sortMode ? (
          <BasketSort onComplete={sortComplete} />
        ) : (
          <>
            <div className="meadow-prompt" aria-live="polite">
              {round.prompt === 'more' ? '^ More?' : 'v Less?'}
            </div>
            <div className="comparison-meadow">
              {['left', 'right'].map((side) => (
                <button
                  key={side}
                  type="button"
                  className={`meadow-group ${
                    (status === 'correct' || showAnswer) && round.answer === side ? 'correct' : ''
                  } ${status === 'try' && !showAnswer && round.answer !== side ? 'soft-wiggle' : ''}`}
                  onClick={() => chooseSide(side)}
                  aria-label={`${side} group`}
                >
                  {round.groups[side].map((item) => (
                    <MeadowThing key={item.id} icon={round.icon} style={{ left: item.left, top: item.top }} />
                  ))}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="learning-streak">
          <span>{streak} in a row!</span>
          <span>Best {best}</span>
        </div>
      </section>
    </div>
  )
}
