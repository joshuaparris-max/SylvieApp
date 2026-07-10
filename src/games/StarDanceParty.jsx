import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { useAppState } from '../hooks/useAppState'

const dancers = [
  { id: 'twirl', label: 'Twirl', color: '#ef476f', x: '14%', y: '46%' },
  { id: 'jump', label: 'Jump', color: '#06d6a0', x: '35%', y: '30%' },
  { id: 'shine', label: 'Shine', color: '#ffd166', x: '58%', y: '50%' },
  { id: 'wave', label: 'Wave', color: '#118ab2', x: '78%', y: '34%' },
]

const wishes = [
  'Kindness makes the biggest sparkle.',
  'A brave try is party magic.',
  'Slow breath, bright heart.',
  'Your idea made the stars dance.',
]

export default function StarDanceParty() {
  const { awardStars } = useAppState()
  const [lit, setLit] = useState([])
  const [wish, setWish] = useState(wishes[0])

  const partyComplete = lit.length === dancers.length

  const skyDots = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: `${8 + ((index * 23) % 86)}%`,
        top: `${8 + ((index * 31) % 58)}%`,
        delay: `${(index % 6) * 120}ms`,
      })),
    [],
  )

  const lightDancer = (dancerId) => {
    const alreadyLit = lit.includes(dancerId)
    const nextLit = alreadyLit ? lit : [...lit, dancerId]
    setLit(nextLit)
    setWish(wishes[nextLit.length % wishes.length])
    if (!alreadyLit) awardStars(1, 'A dancing star joined the party.')
  }

  const resetParty = () => {
    setLit([])
    setWish('Tap each star to start the dance again.')
  }

  return (
    <div>
      <PageHeader title="Star Dance Party" eyebrow="Tap, glow, dance">
        <p>{partyComplete ? 'All the stars are dancing for Sylvie.' : wish}</p>
      </PageHeader>

      <section className="star-party-stage" aria-label="Star dance party">
        <div className="star-party-sky" aria-hidden="true">
          {skyDots.map((dot) => (
            <span
              key={dot.id}
              style={{ left: dot.left, top: dot.top, animationDelay: dot.delay }}
            />
          ))}
        </div>
        <div className="star-party-floor" aria-hidden="true" />

        {dancers.map((dancer) => {
          const active = lit.includes(dancer.id)
          return (
            <button
              key={dancer.id}
              type="button"
              className={`dance-star ${active ? 'active' : ''}`}
              style={{ left: dancer.x, top: dancer.y, '--star-color': dancer.color }}
              onClick={() => lightDancer(dancer.id)}
              aria-label={`${dancer.label} star`}
            >
              <span>{dancer.label}</span>
            </button>
          )
        })}

        <div className="party-message" aria-live="polite">
          {partyComplete ? 'Ta-da! A whole sky show.' : wish}
        </div>
      </section>

      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" className="btn-primary" onClick={resetParty}>
          Again
        </button>
      </div>
    </div>
  )
}
