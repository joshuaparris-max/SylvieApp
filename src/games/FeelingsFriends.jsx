import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'

const BEST_KEY = 'sylvieapp:feelings-best'
const CHECK_KEY = 'sylvieapp:feelings-checkins'

const emotions = [
  { id: 'happy', label: 'happy', color: '#facc15' },
  { id: 'sad', label: 'sad', color: '#93c5fd' },
  { id: 'angry', label: 'angry', color: '#fb7185' },
  { id: 'scared', label: 'scared', color: '#c4b5fd' },
  { id: 'surprised', label: 'surprised', color: '#86efac' },
]

const situations = [
  { text: 'A friend will not share the toy.', answer: 'angry' },
  { text: 'A balloon pops loudly.', answer: 'scared' },
  { text: 'A kind friend gives a hug.', answer: 'happy' },
  { text: 'A favourite cup breaks.', answer: 'sad' },
]

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY) || 0)
  } catch {
    return 0
  }
}

function readCheckins() {
  try {
    return JSON.parse(localStorage.getItem(CHECK_KEY) || '[]')
  } catch {
    return []
  }
}

function speak(text) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 0.82
  window.speechSynthesis.speak(utterance)
}

function makeRound(roundCount = 0, masteredFaces = false) {
  const useSituation = masteredFaces && roundCount % 2 === 1
  if (useSituation) {
    const item = situations[Math.floor(Math.random() * situations.length)]
    return { type: 'situation', ...item, choices: pickChoices(item.answer), stamp: Date.now() }
  }
  const available = masteredFaces ? emotions : emotions.slice(0, 3)
  const answer = available[Math.floor(Math.random() * available.length)].id
  return { type: 'face', answer, choices: pickChoices(answer, available), stamp: Date.now() }
}

function pickChoices(answer, source = emotions) {
  return [
    answer,
    ...source.filter((item) => item.id !== answer).sort(() => Math.random() - 0.5).slice(0, 2).map((item) => item.id),
  ].sort(() => Math.random() - 0.5)
}

function FeelingFace({ emotionId, large = false }) {
  const emotion = emotions.find((item) => item.id === emotionId) || emotions[0]
  return (
    <span
      className={`feeling-face feeling-${emotion.id} ${large ? 'large' : ''}`}
      style={{ '--feeling-color': emotion.color }}
      aria-label={emotion.label}
    >
      <span />
    </span>
  )
}

export default function FeelingsFriends() {
  const [checkMode, setCheckMode] = useState(false)
  const [roundCount, setRoundCount] = useState(0)
  const [faceRun, setFaceRun] = useState(0)
  const [round, setRound] = useState(() => makeRound(0, false))
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(readBest)
  const [checkins, setCheckins] = useState(readCheckins)
  const [status, setStatus] = useState('ready')
  const [wrong, setWrong] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const timers = useRef([])
  const checkId = useRef(0)

  useEffect(() => {
    if (round.type === 'situation') speak(round.text)
  }, [round])

  const schedule = (fn, delay) => {
    const timer = window.setTimeout(fn, delay)
    timers.current.push(timer)
  }

  const choose = (emotionId) => {
    if (checkMode) {
      checkId.current += 1
      const next = [{ id: emotionId, at: checkId.current }, ...checkins].slice(0, 7)
      setCheckins(next)
      try {
        localStorage.setItem(CHECK_KEY, JSON.stringify(next))
      } catch {
        // Optional reflection timeline.
      }
      speak(emotions.find((item) => item.id === emotionId)?.label || emotionId)
      return
    }
    if (status === 'correct') return
    if (emotionId !== round.answer) {
      setWrong(emotionId)
      setShowAnswer(false)
      speak(emotions.find((item) => item.id === round.answer)?.label || round.answer)
      schedule(() => setShowAnswer(true), 1000)
      return
    }
    const nextStreak = streak + 1
    const nextFaceRun = round.type === 'face' ? faceRun + 1 : faceRun
    const masteredFaces = nextFaceRun >= 3
    setStreak(nextStreak)
    setBest(Math.max(best, nextStreak))
    setFaceRun(nextFaceRun)
    setStatus('correct')
    speak(`That feels ${emotionId}`)
    try {
      localStorage.setItem(BEST_KEY, String(Math.max(best, nextStreak)))
    } catch {
      // Optional persistence.
    }
    schedule(() => {
      const nextCount = roundCount + 1
      setRoundCount(nextCount)
      setRound(makeRound(nextCount, masteredFaces))
      setStatus('ready')
      setWrong('')
      setShowAnswer(false)
    }, 1400)
  }

  return (
    <div>
      <PageHeader title="Feelings Friends" eyebrow={checkMode ? 'Check in' : 'Name the feeling'}>
        <p>Friendly faces for noticing feelings.</p>
      </PageHeader>

      <section className={`learning-game-stage feelings-friends ${status === 'correct' ? 'celebrate' : ''}`}>
        <div className="mode-switch meadow-mode-switch">
          <button type="button" className={!checkMode ? 'active' : ''} onClick={() => setCheckMode(false)}>
            match
          </button>
          <button type="button" className={checkMode ? 'active' : ''} onClick={() => setCheckMode(true)}>
            me
          </button>
        </div>

        {checkMode ? (
          <>
            <div className="feeling-question">How do you feel today?</div>
            <div className="emotion-row">
              {emotions.map((emotion) => (
                <button key={emotion.id} type="button" className="emotion-choice" onClick={() => choose(emotion.id)}>
                  <FeelingFace emotionId={emotion.id} />
                  <span>{emotion.label}</span>
                </button>
              ))}
            </div>
            <div className="checkin-row">
              {checkins.map((item) => (
                <FeelingFace key={item.at} emotionId={item.id} />
              ))}
            </div>
          </>
        ) : (
          <>
            <button type="button" className="feeling-main" onClick={() => round.type === 'situation' && speak(round.text)}>
              {round.type === 'face' ? <FeelingFace emotionId={round.answer} large /> : <strong>{round.text}</strong>}
            </button>
            <div className="emotion-row">
              {round.choices.map((emotionId) => (
                <button
                  key={`${round.stamp}-${emotionId}`}
                  type="button"
                  className={`emotion-choice ${wrong === emotionId ? 'soft-wiggle' : ''} ${
                    (showAnswer || status === 'correct') && emotionId === round.answer ? 'active' : ''
                  }`}
                  onClick={() => choose(emotionId)}
                >
                  <FeelingFace emotionId={emotionId} />
                  <span>{emotions.find((item) => item.id === emotionId)?.label}</span>
                </button>
              ))}
            </div>
            <div className="learning-streak">
              <span>{streak} in a row!</span>
              <span>Best {best}</span>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
