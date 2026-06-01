import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import {
  encouragements,
  gardenDecorations,
} from '../data/content'
import { useAppState } from '../hooks/useAppState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'

const flowers = [
  { id: 'rose', label: 'Rose', left: '12%', top: '58%' },
  { id: 'bell', label: 'Bluebell', left: '32%', top: '44%' },
  { id: 'daisy', label: 'Daisy', left: '55%', top: '60%' },
  { id: 'lily', label: 'Moon lily', left: '74%', top: '40%' },
]

const tinyStars = [
  { id: 'north', left: '22%', top: '20%' },
  { id: 'pond', left: '48%', top: '28%' },
  { id: 'gate', left: '78%', top: '22%' },
]

const defaultGarden = {
  bloomed: [],
  collected: [],
  lastMessage: encouragements[0],
}

export default function FairyGarden() {
  const { stars, settings, awardStars } = useAppState()
  const [garden, setGarden] = useLocalStorage(
    STORAGE_KEYS.fairyGarden,
    defaultGarden,
  )
  const [sparkles, setSparkles] = useState([])
  const safeGarden = {
    ...defaultGarden,
    ...garden,
    bloomed: Array.isArray(garden?.bloomed) ? garden.bloomed : [],
    collected: Array.isArray(garden?.collected) ? garden.collected : [],
    lastMessage: garden?.lastMessage || defaultGarden.lastMessage,
  }

  const allMessages = useMemo(
    () => [...encouragements, ...settings.customEncouragements],
    [settings.customEncouragements],
  )

  const showSparkles = (id) => {
    setSparkles((current) => [...current.slice(-5), { id, stamp: Date.now() }])
  }

  const nextMessage = (offset = 0) =>
    allMessages[
      (safeGarden.bloomed.length + safeGarden.collected.length + offset) %
        allMessages.length
    ] || encouragements[0]

  const bloomFlower = (flowerId) => {
    const alreadyBloomed = safeGarden.bloomed.includes(flowerId)
    setGarden((current) => ({
      ...defaultGarden,
      ...current,
      bloomed: alreadyBloomed ? safeGarden.bloomed : [...safeGarden.bloomed, flowerId],
      lastMessage: nextMessage(1),
    }))
    showSparkles(flowerId)
    if (!alreadyBloomed) awardStars(1, 'A flower bloomed.')
  }

  const collectStar = (starId) => {
    if (safeGarden.collected.includes(starId)) return
    setGarden((current) => ({
      ...defaultGarden,
      ...current,
      collected: [...safeGarden.collected, starId],
      lastMessage: nextMessage(2),
    }))
    awardStars(1, 'A soft garden star joined Sylvie.')
  }

  return (
    <div>
      <PageHeader title="Fairy Garden" eyebrow="Bloom and sparkle">
        <p>{safeGarden.lastMessage}</p>
      </PageHeader>

      <section className="garden-stage" aria-label="Interactive fairy garden">
        <div className="garden-sky" />
        <div className="garden-hill hill-back" />
        <div className="garden-hill hill-front" />

        {tinyStars.map((star) => (
          <button
            key={star.id}
            type="button"
            aria-label="Collect garden star"
            className={`garden-star ${
              safeGarden.collected.includes(star.id) ? 'collected' : ''
            }`}
            style={{ left: star.left, top: star.top }}
            onClick={() => collectStar(star.id)}
          >
            *
          </button>
        ))}

        {flowers.map((flower) => (
          <button
            key={flower.id}
            type="button"
            className={`garden-flower ${
              safeGarden.bloomed.includes(flower.id) ? 'bloomed' : ''
            }`}
            style={{ left: flower.left, top: flower.top }}
            onClick={() => bloomFlower(flower.id)}
            aria-label={`Bloom ${flower.label}`}
          >
            <span />
          </button>
        ))}

        {sparkles.map((sparkle) => (
          <span
            key={`${sparkle.id}-${sparkle.stamp}`}
            className="sparkle-pop"
            aria-hidden="true"
          />
        ))}
      </section>

      <section className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {gardenDecorations.map((decoration) => {
          const unlocked = stars >= decoration.stars
          return (
            <div
              key={decoration.id}
              className={`unlock-card ${unlocked ? 'unlocked' : ''}`}
            >
              <p className="font-black text-slate-900">{decoration.name}</p>
              <p className="mt-1 text-sm text-slate-600">
                {unlocked
                  ? 'Unlocked for the garden.'
                  : `${decoration.stars} stars to unlock.`}
              </p>
            </div>
          )
        })}
      </section>
    </div>
  )
}
