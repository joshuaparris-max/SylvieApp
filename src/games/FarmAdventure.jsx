import { crops, farmAnimals, farmDecorations } from '../data/content'
import PageHeader from '../components/PageHeader'
import { useAppState } from '../hooks/useAppState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'

const defaultFarm = {
  selectedCrop: crops[0].id,
  plots: Array.from({ length: 6 }, () => ({ crop: null, stage: 0 })),
  basket: {},
  fedAnimals: {},
  decorations: [],
}

export default function FarmAdventure() {
  const { stars, awardStars } = useAppState()
  const [farm, setFarm] = useLocalStorage(STORAGE_KEYS.farm, defaultFarm)
  const safeFarm = {
    ...defaultFarm,
    ...farm,
    selectedCrop: crops.some((crop) => crop.id === farm?.selectedCrop)
      ? farm.selectedCrop
      : defaultFarm.selectedCrop,
    plots: Array.isArray(farm?.plots)
      ? [...farm.plots, ...defaultFarm.plots]
          .slice(0, defaultFarm.plots.length)
          .map((plot) => ({
            crop: crops.some((crop) => crop.id === plot?.crop) ? plot.crop : null,
            stage: Math.min(3, Math.max(0, Number(plot?.stage || 0))),
          }))
      : defaultFarm.plots,
    basket: farm?.basket && typeof farm.basket === 'object' ? farm.basket : {},
    fedAnimals:
      farm?.fedAnimals && typeof farm.fedAnimals === 'object'
        ? farm.fedAnimals
        : {},
    decorations: Array.isArray(farm?.decorations) ? farm.decorations : [],
  }

  const selectedCrop = crops.find((crop) => crop.id === safeFarm.selectedCrop) || crops[0]

  const updatePlot = (index) => {
    const plot = safeFarm.plots[index]

    if (!plot.crop) {
      setFarm((current) => ({
        ...defaultFarm,
        ...current,
        plots: safeFarm.plots.map((item, itemIndex) =>
          itemIndex === index ? { crop: selectedCrop.id, stage: 1 } : item,
        ),
      }))
      return
    }

    if (plot.stage < 3) {
      setFarm((current) => ({
        ...defaultFarm,
        ...current,
        plots: safeFarm.plots.map((item, itemIndex) =>
          itemIndex === index ? { ...item, stage: item.stage + 1 } : item,
        ),
      }))
      return
    }

    setFarm((current) => ({
      ...defaultFarm,
      ...current,
      plots: safeFarm.plots.map((item, itemIndex) =>
        itemIndex === index ? { crop: null, stage: 0 } : item,
      ),
      basket: {
        ...safeFarm.basket,
        [plot.crop]: Number(safeFarm.basket[plot.crop] || 0) + 1,
      },
    }))
    awardStars(1, 'A gentle harvest was gathered.')
  }

  const feedAnimal = (animalId) => {
    setFarm((current) => ({
      ...defaultFarm,
      ...current,
      fedAnimals: {
        ...safeFarm.fedAnimals,
        [animalId]: Number(safeFarm.fedAnimals[animalId] || 0) + 1,
      },
    }))
    awardStars(1, 'An animal was cared for.')
  }

  const addDecoration = (decoration) => {
    if (stars < decoration.stars || safeFarm.decorations.includes(decoration.id)) return
    setFarm((current) => ({
      ...defaultFarm,
      ...current,
      decorations: [...safeFarm.decorations, decoration.id],
    }))
    awardStars(1, `${decoration.name} joined the farm.`)
  }

  return (
    <div>
      <PageHeader title="Farm Adventure" eyebrow="Plant, water, harvest">
        <p>A cozy farm with kind chores, growing crops, and soft harvests inspired by gentle farm play.</p>
      </PageHeader>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
          <div className="mb-4 flex flex-wrap gap-2">
            {crops.map((crop) => (
              <button
                key={crop.id}
                type="button"
                className={`choice-chip ${
                  safeFarm.selectedCrop === crop.id ? 'selected' : ''
                }`}
                onClick={() => setFarm((current) => ({ ...current, selectedCrop: crop.id }))}
              >
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ background: crop.color }}
                  aria-hidden="true"
                />
                {crop.name}
              </button>
            ))}
          </div>

          <div className="farm-grid" aria-label="Farm plots">
            {safeFarm.plots.map((plot, index) => {
              const crop = crops.find((item) => item.id === plot.crop)
              return (
                <button
                  key={`${plot.crop || 'empty'}-${index}`}
                  type="button"
                  className={`farm-plot stage-${plot.stage}`}
                  onClick={() => updatePlot(index)}
                  aria-label={`Farm plot ${index + 1}`}
                >
                  {plot.crop ? (
                    <span
                      className="crop-sprout"
                      style={{ background: crop?.color }}
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="soil-line" aria-hidden="true" />
                  )}
                  <span className="mt-2 text-xs font-bold text-slate-700">
                    {!plot.crop ? 'Plant' : plot.stage < 3 ? 'Water' : 'Harvest'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <section className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
            <h2 className="panel-title">Animal care</h2>
            <div className="grid gap-2">
              {farmAnimals.map((animal) => (
                <button
                  key={animal.id}
                  type="button"
                  className="animal-button"
                  onClick={() => feedAnimal(animal.id)}
                >
                  <span className="animal-face" aria-hidden="true" />
                  <span>
                    <span className="block font-black">{animal.name}</span>
                    <span className="text-sm text-slate-600">
                      Gift: {animal.gift}
                    </span>
                  </span>
                  <span className="ml-auto font-black">
                    {safeFarm.fedAnimals[animal.id] || 0}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
            <h2 className="panel-title">Harvest basket</h2>
            <div className="grid grid-cols-3 gap-2">
              {crops.map((crop) => (
                <div key={crop.id} className="rounded-lg bg-amber-50 p-3 text-center">
                  <span
                    className="mx-auto block h-5 w-5 rounded-full"
                    style={{ background: crop.color }}
                    aria-hidden="true"
                  />
                  <p className="mt-2 text-sm font-bold text-slate-700">
                    {safeFarm.basket[crop.id] || 0}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="mt-4 grid gap-3 sm:grid-cols-3">
        {farmDecorations.map((decoration) => {
          const placed = safeFarm.decorations.includes(decoration.id)
          const unlocked = stars >= decoration.stars
          return (
            <button
              key={decoration.id}
              type="button"
              className={`unlock-card text-left ${
                placed ? 'unlocked' : unlocked ? '' : 'locked'
              }`}
              onClick={() => addDecoration(decoration)}
            >
              <span className="font-black text-slate-900">{decoration.name}</span>
              <span className="mt-1 block text-sm text-slate-600">
                {placed
                  ? 'Placed on the farm.'
                  : unlocked
                    ? 'Tap to place.'
                    : `${decoration.stars} stars to unlock.`}
              </span>
            </button>
          )
        })}
      </section>
    </div>
  )
}
