import { useEffect, useMemo, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'

const BEST_KEY = 'sylvieapp:pattern-parade-best'
const LEVEL_KEY = 'sylvieapp:pattern-parade-level'

const icons = [
  { id: 'sun', label: 'sun', face: 'sun', color: '#ffd166' },
  { id: 'moon', label: 'moon', face: 'moon', color: '#93c5fd' },
  { id: 'heart', label: 'heart', face: 'heart', color: '#fb7185' },
  { id: 'leaf', label: 'leaf', face: 'leaf', color: '#86efac' },
  { id: 'star', label: 'star', face: 'star', color: '#facc15' },
  { id: 'gem', label: 'gem', face: 'gem', color: '#c4b5fd' },
]

const levelUnits = [
  ['sun', 'moon'],
  ['star', 'star', 'heart'],
  ['sun', 'leaf', 'gem'],
]

function readNumber(key, fallback) {
  try {
    return Number(localStorage.getItem(key) || fallback)
  } catch {
    return fallback
  }
}

function makeRound(level) {
  const unit = levelUnits[level - 1]
  const repeats = level === 1 ? 3 : 2
  const visible = Array.from({ length: repeats }, () => unit).flat()
  const answer = unit[visible.length % unit.length]
  const distractors = icons
    .map((icon) => icon.id)
    .filter((id) => id !== answer && !unit.includes(id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
  const choices = [answer, ...distractors].sort(() => Math.random() - 0.5)
  return { unit, visible, answer, choices, stamp: Date.now() }
}

function PatternIcon({ id, blank, active, wrong, onClick }) {
  const icon = icons.find((item) => item.id === id)
  return (
    <button
      type="button"
      className={`learning-icon ${blank ? 'blank' : ''} ${active ? 'active' : ''} ${
        wrong ? 'wrong' : ''
      }`}
      style={{ '--icon-color': icon?.color || '#fff' }}
      onClick={onClick}
      aria-label={blank ? 'missing pattern piece' : icon?.label}
      disabled={!onClick}
    >
      {blank ? '?' : <span className={`learning-symbol symbol-${icon.face}`} />}
    </button>
  )
}

export default function PatternParade() {
  const [level, setLevel] = useState(() => Math.min(3, Math.max(1, readNumber(LEVEL_KEY, 1))))
  const [round, setRound] = useState(() => makeRound(level))
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(() => readNumber(BEST_KEY, 0))
  const [correctRun, setCorrectRun] = useState(0)
  const [status, setStatus] = useState('ready')
  const [wrongChoice, setWrongChoice] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  const timers = useRef([])

  const row = useMemo(() => [...round.visible, round.answer], [round])
  const celebration = streak > 0 && streak % 5 === 0 && status === 'correct'

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const schedule = (fn, delay) => {
    const timer = window.setTimeout(fn, delay)
    timers.current.push(timer)
  }

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
  }

  const playChime = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    ;[523, 659, 784].forEach((frequency, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = frequency
      gain.gain.setValueAtTime(0.001, ctx.currentTime + index * 0.08)
      gain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + index * 0.08 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 0.18)
      osc.connect(gain).connect(ctx.destination)
      osc.start(ctx.currentTime + index * 0.08)
      osc.stop(ctx.currentTime + index * 0.08 + 0.2)
    })
  }

  const nextRound = (nextLevel = level) => {
    clearTimers()
    setRound(makeRound(nextLevel))
    setStatus('ready')
    setWrongChoice('')
    setShowAnswer(false)
    setHighlight(-1)
  }

  const choose = (choice) => {
    if (status === 'correct') return
    clearTimers()
    if (choice !== round.answer) {
      setWrongChoice(choice)
      setShowAnswer(false)
      setStatus('try')
      schedule(() => setShowAnswer(true), 1000)
      return
    }

    const nextStreak = streak + 1
    const nextRun = correctRun + 1
    const nextLevel = nextRun >= 3 ? Math.min(3, level + 1) : level
    setStreak(nextStreak)
    setBest(Math.max(best, nextStreak))
    setCorrectRun(nextRun >= 3 ? 0 : nextRun)
    setStatus('correct')
    playChime()
    try {
      localStorage.setItem(BEST_KEY, String(Math.max(best, nextStreak)))
      localStorage.setItem(LEVEL_KEY, String(nextLevel))
    } catch {
      // Best streak is optional.
    }
    if (nextLevel !== level) setLevel(nextLevel)
    row.forEach((_, index) => schedule(() => setHighlight(index), index * 130))
    schedule(() => nextRound(nextLevel), 1400)
  }

  return (
    <div>
      <PageHeader title="Pattern Parade" eyebrow={`Level ${level}`}>
        <p>Find the next friendly picture in the pattern.</p>
      </PageHeader>

      <section className={`learning-game-stage pattern-parade ${celebration ? 'celebrate' : ''}`}>
        <div className="learning-row pattern-row" aria-label="Pattern row">
          {round.visible.map((id, index) => (
            <PatternIcon key={`${round.stamp}-${id}-${index}`} id={id} active={highlight === index} />
          ))}
          <PatternIcon id={round.answer} blank={status !== 'correct'} active={highlight === row.length - 1} />
        </div>

        <div className="learning-choice-row" aria-label="Choose the next pattern piece">
          {round.choices.map((choice) => (
            <PatternIcon
              key={choice}
              id={choice}
              active={showAnswer && choice === round.answer}
              wrong={wrongChoice === choice}
              onClick={() => choose(choice)}
            />
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
