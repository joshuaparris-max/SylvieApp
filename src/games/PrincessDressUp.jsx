import PageHeader from '../components/PageHeader'
import { dressUpOptions } from '../data/content'
import { useAppState } from '../hooks/useAppState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'

const defaultOutfit = Object.fromEntries(
  Object.entries(dressUpOptions).map(([key, values]) => [key, values[0]]),
)

const partStyles = {
  theme: {
    'Ice princess': { sky: '#dbeafe', ground: '#f8fafc' },
    'Ocean princess': { sky: '#bae6fd', ground: '#ccfbf1' },
    'Forest princess': { sky: '#dcfce7', ground: '#bbf7d0' },
    'Book-loving princess': { sky: '#fef3c7', ground: '#fde68a' },
    'Mermaid princess': { sky: '#cffafe', ground: '#a7f3d0' },
    'Fairy princess': { sky: '#f5d0fe', ground: '#dcfce7' },
  },
  dress: {
    'Snowdrop gown': '#bfdbfe',
    'Wave twirl dress': '#38bdf8',
    'Leaf velvet dress': '#22c55e',
    'Storybook dress': '#facc15',
    'Petal party dress': '#f9a8d4',
  },
  shoes: {
    'Silver slippers': '#94a3b8',
    'Shell shoes': '#fb7185',
    'Moss boots': '#166534',
    'Daisy flats': '#fef08a',
  },
  wand: {
    'Starlight wand': '#6d28d9',
    'Bubble wand': '#0ea5e9',
    'Acorn wand': '#92400e',
    'Rainbow pencil wand': '#ef4444',
  },
  crown: {
    'Crystal crown': '#bfdbfe',
    'Pearl crown': '#f8fafc',
    'Blossom crown': '#f9a8d4',
    'Book crown': '#facc15',
  },
  cape: {
    'Frost cape': '#93c5fd',
    'Sea cape': '#06b6d4',
    'Fern cape': '#16a34a',
    'Velvet cape': '#8b5cf6',
  },
  hair: {
    'Honey curls': '#a16207',
    'Rose bob': '#be123c',
    'Cocoa waves': '#7c2d12',
    'Moonlight braids': '#e2e8f0',
  },
  sparkle: {
    'Soft stars': '#facc15',
    'Tiny bubbles': '#67e8f9',
    'Leaf glimmers': '#4ade80',
    'Book dust': '#fbbf24',
  },
}

function randomItem(values) {
  return values[Math.floor(Math.random() * values.length)]
}

function getSafeOutfit(outfit) {
  const source =
    outfit && typeof outfit === 'object' && !Array.isArray(outfit) ? outfit : {}

  return Object.fromEntries(
    Object.entries(dressUpOptions).map(([part, values]) => [
      part,
      values.includes(source[part]) ? source[part] : values[0],
    ]),
  )
}

export default function PrincessDressUp() {
  const { awardStars } = useAppState()
  const [outfit, setOutfit] = useLocalStorage(STORAGE_KEYS.outfit, defaultOutfit)
  const safeOutfit = getSafeOutfit(outfit)
  const themeStyle = partStyles.theme[safeOutfit.theme]
  const previewStyle = {
    '--preview-sky': themeStyle.sky,
    '--preview-ground': themeStyle.ground,
    '--preview-hair': partStyles.hair[safeOutfit.hair],
    '--preview-crown': partStyles.crown[safeOutfit.crown],
    '--preview-cape': partStyles.cape[safeOutfit.cape],
    '--preview-dress': partStyles.dress[safeOutfit.dress],
    '--preview-shoes': partStyles.shoes[safeOutfit.shoes],
    '--preview-wand': partStyles.wand[safeOutfit.wand],
    '--preview-sparkle': partStyles.sparkle[safeOutfit.sparkle],
  }

  const updateOutfit = (part, value) => {
    setOutfit((current) => ({ ...getSafeOutfit(current), [part]: value }))
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
          <div className="dress-preview" style={previewStyle} aria-label="Outfit preview">
            <span className="preview-hair" />
            <span className="preview-crown" />
            <span className="preview-face" />
            <span className="preview-cape" />
            <span className="preview-dress" />
            <span className="preview-shoes" />
            <span className="preview-wand" />
            <span className="preview-sparkle sparkle-one" />
            <span className="preview-sparkle sparkle-two" />
            <span className="preview-sparkle sparkle-three" />
          </div>
          <div className="mt-4 grid gap-2 text-sm text-slate-700">
            {Object.entries(dressUpOptions)
              .map(([key]) => (
                <p key={key} className="rounded-lg bg-white px-3 py-2">
                  <span className="font-black capitalize">{key}: </span>
                  {safeOutfit[key]}
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
