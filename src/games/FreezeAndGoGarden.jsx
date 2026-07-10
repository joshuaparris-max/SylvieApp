import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'

const GROW_KEY = 'sylvieapp:freeze-go-growth'

function readGrowth() {
  try {
    return Number(localStorage.getItem(GROW_KEY) || 0)
  } catch {
    return 0
  }
}

function speak(text) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 0.9
  window.speechSynthesis.speak(utterance)
}

export default function FreezeAndGoGarden() {
  const [signal, setSignal] = useState('go')
  const [growth, setGrowth] = useState(readGrowth)
  const [reminder, setReminder] = useState('')
  const [hardMode, setHardMode] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    const schedule = () => {
      const delay = 2000 + Math.floor(Math.random() * 3000)
      timer.current = window.setTimeout(() => {
        setSignal((current) => {
          const next = current === 'go' ? 'stop' : 'go'
          speak(next === 'go' ? 'Go!' : 'Freeze!')
          return next
        })
        schedule()
      }, delay)
    }
    speak('Go!')
    schedule()
    return () => window.clearTimeout(timer.current)
  }, [])

  const tapGarden = () => {
    if (signal === 'stop') {
      setReminder('Freeze!')
      speak('Freeze!')
      window.setTimeout(() => setReminder(''), 800)
      return
    }
    setReminder('')
    setGrowth((current) => {
      const next = Math.min(30, current + 1)
      try {
        localStorage.setItem(GROW_KEY, String(next))
      } catch {
        // Optional garden persistence.
      }
      return next
    })
  }

  const flowers = Array.from({ length: Math.min(growth, 18) }, (_, index) => index)
  const treeHeight = 76 + Math.min(growth, 30) * 4

  return (
    <div>
      <PageHeader title="Freeze and Go Garden" eyebrow={signal === 'go' ? 'Go' : 'Stop'}>
        <p>Grow the garden on go. Freeze on stop.</p>
      </PageHeader>

      <section className="learning-game-stage freeze-go-garden">
        <div className="mode-switch meadow-mode-switch">
          <button type="button" className={!hardMode ? 'active' : ''} onClick={() => setHardMode(false)}>
            easy
          </button>
          <button type="button" className={hardMode ? 'active' : ''} onClick={() => setHardMode(true)}>
            tricky
          </button>
        </div>

        <div className={`signal-card signal-${signal}`}>
          <span>{hardMode ? (signal === 'go' ? 'STOP' : 'GO') : signal.toUpperCase()}</span>
          <strong>{signal === 'go' ? '>' : '||'}</strong>
        </div>

        <button type="button" className="grow-garden-button" onClick={tapGarden}>
          <div className="go-garden-scene">
            <span className="go-tree" style={{ height: `${treeHeight}px` }} />
            {flowers.map((flower) => (
              <span key={flower} className="go-flower" style={{ '--i': flower }} />
            ))}
          </div>
          <span className="grow-label">{reminder || 'tap garden'}</span>
        </button>
      </section>
    </div>
  )
}
