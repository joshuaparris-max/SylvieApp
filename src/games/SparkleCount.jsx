import { useEffect, useMemo, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'

const BEST_STREAK_KEY = 'sylvieapp:sparkle-count-best'
const ICONS = ['star', 'apple', 'ladybug']
const ROUND_DELAY_MS = 1500
const SHOW_CORRECT_DELAY_MS = 1000

const layouts = {
  1: [[50, 47]],
  2: [
    [38, 42],
    [62, 56],
  ],
  3: [
    [34, 38],
    [63, 34],
    [51, 62],
  ],
  4: [
    [35, 36],
    [64, 40],
    [42, 64],
    [68, 66],
  ],
}

const iconStyles = {
  star: {
    label: 'star',
    palette: 'from-amber-200 via-yellow-300 to-orange-300',
    mark: '*',
  },
  apple: {
    label: 'apple',
    palette: 'from-rose-300 via-red-400 to-emerald-300',
    mark: 'a',
  },
  ladybug: {
    label: 'ladybug',
    palette: 'from-red-300 via-rose-400 to-slate-800',
    mark: 'o',
  },
}

function makeRound(previousAnswer) {
  const answers = [1, 2, 3, 4].filter((value) => value !== previousAnswer)
  const answer = answers[Math.floor(Math.random() * answers.length)] || 1
  const icon = ICONS[Math.floor(Math.random() * ICONS.length)]
  const layout = layouts[answer].map(([left, top], index) => {
    const nudge = Math.random() * 8 - 4
    return {
      id: `${Date.now()}-${index}`,
      left: `${Math.max(18, Math.min(82, left + nudge))}%`,
      top: `${Math.max(20, Math.min(76, top - nudge))}%`,
      delay: `${index * 180}ms`,
    }
  })
  const choices = [answer - 1, answer, answer + 1]
    .filter((value) => value >= 1 && value <= 4)
  if (choices.length < 3) choices.push(answer === 1 ? 3 : 2)

  return {
    answer,
    icon,
    layout,
    choices: [...new Set(choices)].sort(() => Math.random() - 0.5),
  }
}

function getBestStreak() {
  try {
    return Number(localStorage.getItem(BEST_STREAK_KEY) || 0)
  } catch {
    return 0
  }
}

function SparkleIcon({ kind, active, countActive, style }) {
  const icon = iconStyles[kind]

  return (
    <span
      className={`sparkle-count-icon bg-gradient-to-br ${icon.palette} ${
        active ? 'bursting' : ''
      } ${countActive ? 'counting' : ''}`}
      style={style}
      aria-label={icon.label}
    >
      {kind === 'star' ? (
        <span className="sparkle-star-shape" />
      ) : kind === 'apple' ? (
        <span className="sparkle-apple-shape" />
      ) : (
        <span className="sparkle-ladybug-shape" />
      )}
    </span>
  )
}

export default function SparkleCount() {
  const [round, setRound] = useState(() => makeRound(0))
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(getBestStreak)
  const [muted, setMuted] = useState(false)
  const [status, setStatus] = useState('ready')
  const [countStep, setCountStep] = useState(0)
  const [showCorrect, setShowCorrect] = useState(false)
  const timers = useRef([])
  const audioContext = useRef(null)

  const celebration = status === 'celebrating'
  const gentleWiggle = status === 'try-again'

  const countLabel = useMemo(
    () =>
      countStep > 0
        ? Array.from({ length: countStep }, (_, index) => index + 1).join(', ')
        : '',
    [countStep],
  )

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout)
    },
    [],
  )

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
  }

  const schedule = (callback, delay) => {
    const timer = window.setTimeout(callback, delay)
    timers.current.push(timer)
  }

  const playTone = (frequencies, duration = 0.14) => {
    if (muted) return
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    audioContext.current ||= new AudioContext()
    const now = audioContext.current.currentTime
    frequencies.forEach((frequency, index) => {
      const oscillator = audioContext.current.createOscillator()
      const gain = audioContext.current.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(frequency, now + index * 0.08)
      gain.gain.setValueAtTime(0.0001, now + index * 0.08)
      gain.gain.exponentialRampToValueAtTime(0.12, now + index * 0.08 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + duration)
      oscillator.connect(gain).connect(audioContext.current.destination)
      oscillator.start(now + index * 0.08)
      oscillator.stop(now + index * 0.08 + duration + 0.02)
    })
  }

  const rememberBest = (nextStreak) => {
    const nextBest = Math.max(bestStreak, nextStreak)
    setBestStreak(nextBest)
    try {
      localStorage.setItem(BEST_STREAK_KEY, String(nextBest))
    } catch {
      // Local storage is optional for this game.
    }
  }

  const nextRound = () => {
    clearTimers()
    setRound((current) => makeRound(current.answer))
    setStatus('ready')
    setCountStep(0)
    setShowCorrect(false)
  }

  const handleChoice = (choice) => {
    if (status === 'correct' || status === 'celebrating') return
    clearTimers()

    if (choice !== round.answer) {
      setStatus('try-again')
      setShowCorrect(false)
      schedule(() => setShowCorrect(true), SHOW_CORRECT_DELAY_MS)
      return
    }

    const nextStreak = streak + 1
    const isMilestone = nextStreak % 5 === 0
    setStreak(nextStreak)
    rememberBest(nextStreak)
    setStatus(isMilestone ? 'celebrating' : 'correct')
    setShowCorrect(false)
    playTone(isMilestone ? [523, 659, 784, 1046] : [523, 659, 784], 0.16)

    for (let index = 1; index <= round.answer; index += 1) {
      schedule(() => setCountStep(index), index * 260)
    }
    schedule(nextRound, ROUND_DELAY_MS)
  }

  return (
    <div>
      <PageHeader title="Sparkle Count" eyebrow="See the number">
        <p>Small groups, gentle counting, no pressure.</p>
      </PageHeader>

      <section
        className={`sparkle-count-stage ${gentleWiggle ? 'gentle-wiggle' : ''}`}
        aria-label="Count the friendly icons"
      >
        <button
          type="button"
          className="sparkle-mute"
          onClick={() => setMuted((current) => !current)}
          aria-label={muted ? 'Turn sound on' : 'Mute sound'}
        >
          {muted ? 'off' : 'sound'}
        </button>

        {celebration ? (
          <div className="sparkle-confetti" aria-hidden="true">
            {Array.from({ length: 24 }, (_, index) => (
              <span key={index} style={{ '--i': index }} />
            ))}
          </div>
        ) : null}

        <div className="sparkle-count-sky">
          {round.layout.map((item, index) => (
            <SparkleIcon
              key={item.id}
              kind={round.icon}
              active={status === 'correct' || celebration}
              countActive={countStep === index + 1}
              style={{ left: item.left, top: item.top, animationDelay: item.delay }}
            />
          ))}
        </div>

        <div className="sparkle-count-readout" aria-live="polite">
          {countLabel || (streak > 0 ? `${streak} in a row!` : '')}
        </div>

        <div className="sparkle-number-row" aria-label="Choose the matching number">
          {round.choices.map((choice) => (
            <button
              key={choice}
              type="button"
              className={`sparkle-number-button ${
                showCorrect && choice === round.answer ? 'show-correct' : ''
              }`}
              onClick={() => handleChoice(choice)}
              aria-label={`${choice}`}
            >
              {choice}
            </button>
          ))}
        </div>

        <div className="sparkle-streak" aria-live="polite">
          <span>{streak} in a row!</span>
          <span>Best {bestStreak}</span>
        </div>
      </section>
    </div>
  )
}
