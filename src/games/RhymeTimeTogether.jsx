import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'

const BEST_KEY = 'sylvieapp:rhyme-time-best'

const wordRounds = [
  { word: 'dog', kind: 'dog', answer: 'bone', choices: ['bone', 'cup', 'shoe'] },
  { word: 'apple', kind: 'apple', answer: 'banana', choices: ['banana', 'bed', 'car'] },
  { word: 'rain', kind: 'rain', answer: 'umbrella', choices: ['umbrella', 'sock', 'chair'] },
  { word: 'book', kind: 'book', answer: 'library', choices: ['library', 'spoon', 'ball'] },
]

const rhymeRounds = [
  { word: 'cat', kind: 'cat', answer: 'hat', choices: ['hat', 'dog', 'sun'] },
  { word: 'bee', kind: 'bee', answer: 'tree', choices: ['tree', 'cup', 'fish'] },
  { word: 'cake', kind: 'cake', answer: 'snake', choices: ['snake', 'moon', 'bed'] },
]

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY) || 0)
  } catch {
    return 0
  }
}

function makeRound(count = 0) {
  const rhyme = count % 3 === 2
  const source = rhyme ? rhymeRounds : wordRounds
  const round = source[Math.floor(Math.random() * source.length)]
  return {
    ...round,
    mode: rhyme ? 'Rhyme Friends' : 'Word Friends',
    choices: [...round.choices].sort(() => Math.random() - 0.5),
    stamp: Date.now(),
  }
}

function speak(word) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(word)
  utterance.rate = 0.82
  window.speechSynthesis.speak(utterance)
}

function Picture({ kind }) {
  return (
    <span className={`word-picture word-${kind}`}>
      <span />
    </span>
  )
}

export default function RhymeTimeTogether() {
  const [roundCount, setRoundCount] = useState(0)
  const [round, setRound] = useState(() => makeRound(0))
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(readBest)
  const [status, setStatus] = useState('ready')
  const [wrong, setWrong] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const timers = useRef([])

  useEffect(() => {
    speak(round.word)
    const activeTimers = timers.current
    return () => activeTimers.forEach(window.clearTimeout)
  }, [round])

  const schedule = (fn, delay) => {
    const timer = window.setTimeout(fn, delay)
    timers.current.push(timer)
  }

  const choose = (choice) => {
    if (status === 'correct') return
    if (choice !== round.answer) {
      setWrong(choice)
      setShowAnswer(false)
      speak(round.word)
      schedule(() => setShowAnswer(true), 1000)
      return
    }
    const nextStreak = streak + 1
    const nextCount = roundCount + 1
    setStreak(nextStreak)
    setBest(Math.max(best, nextStreak))
    setStatus('correct')
    speak(choice)
    try {
      localStorage.setItem(BEST_KEY, String(Math.max(best, nextStreak)))
    } catch {
      // Optional persistence.
    }
    schedule(() => {
      setRoundCount(nextCount)
      setRound(makeRound(nextCount))
      setStatus('ready')
      setWrong('')
      setShowAnswer(false)
    }, 1300)
  }

  return (
    <div>
      <PageHeader title="Rhyme Time Together" eyebrow={round.mode}>
        <p>Listen to the word, then choose its friend.</p>
      </PageHeader>

      <section className={`learning-game-stage word-friends ${status === 'correct' ? 'celebrate' : ''}`}>
        <button type="button" className="listen-card" onClick={() => speak(round.word)}>
          <Picture kind={round.kind} />
          <strong>{round.word}</strong>
        </button>

        <div className="word-choice-row">
          {round.choices.map((choice) => (
            <button
              key={`${round.stamp}-${choice}`}
              type="button"
              className={`word-choice ${wrong === choice ? 'soft-wiggle' : ''} ${
                (showAnswer || status === 'correct') && choice === round.answer ? 'active' : ''
              }`}
              onClick={() => choose(choice)}
            >
              <Picture kind={choice} />
              <span>{choice}</span>
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
