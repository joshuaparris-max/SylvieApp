import PageHeader from '../components/PageHeader'
import { dressUpOptions } from '../data/content'
import { useAppState } from '../hooks/useAppState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'

const defaultOutfit = Object.fromEntries(
  Object.entries(dressUpOptions).map(([key, values]) => [key, values[0]]),
)

function randomItem(values) {
  return values[Math.floor(Math.random() * values.length)]
}

export default function PrincessDressUp() {
  const { awardStars } = useAppState()
  const [outfit, setOutfit] = useLocalStorage(STORAGE_KEYS.outfit, defaultOutfit)
  const safeOutfit = { ...defaultOutfit, ...outfit }

  const updateOutfit = (part, value) => {
    setOutfit((current) => ({ ...current, [part]: value }))
  }

  const randomOutfit = () => {
    setOutfit(
      Object.fromEntries(
        Object.entries(dressUpOptions).map(([key, values]) => [
          key,
          randomItem(values),
        ]),
      ),
    )
    awardStars(1, 'A magical outfit was created.')
  }

  const saveOutfit = () => {
    setOutfit((current) => ({ ...current, savedAt: Date.now() }))
    awardStars(1, 'Outfit saved.')
  }

  return (
    <div>
      <PageHeader title="Princess Dress-Up" eyebrow="Original outfits">
        <p>Build a kind, brave, sparkly outfit with wands, shoes, crowns, capes, and gentle princess style.</p>
      </PageHeader>

      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-white/80 bg-white/90 p-5 shadow-soft">
          <div className="dress-preview" aria-label="Outfit preview">
            <span className="preview-hair" />
            <span className="preview-crown" />
            <span className="preview-face" />
            <span className="preview-cape" />
            <span className="preview-dress" />
            <span className="preview-shoes" />
            <span className="preview-wand" />
          </div>
          <div className="mt-4 grid gap-2 text-sm text-slate-700">
            {Object.entries(safeOutfit)
              .filter(([key]) => key !== 'savedAt')
              .map(([key, value]) => (
                <p key={key} className="rounded-lg bg-white px-3 py-2">
                  <span className="font-black capitalize">{key}: </span>
                  {value}
                </p>
              ))}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button type="button" className="btn-primary" onClick={randomOutfit}>
              Random Magical Outfit
            </button>
            <button type="button" className="btn-secondary" onClick={saveOutfit}>
              Save Outfit
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(dressUpOptions).map(([part, values]) => (
            <section
              key={part}
              className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft"
            >
              <h2 className="panel-title capitalize">{part}</h2>
              <div className="grid gap-2">
                {values.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`choice-chip ${
                      safeOutfit[part] === value ? 'selected' : ''
                    }`}
                    onClick={() => updateOutfit(part, value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  )
}
