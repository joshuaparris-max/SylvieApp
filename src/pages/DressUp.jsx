import { useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'
import PageCard from '../components/PageCard'

const dresses = ['Ice gown', 'Ocean dress', 'Forest robe', 'Storybook skirt', 'Mermaid top', 'Fairy dress']
const shoes = ['Sparkle boots', 'Soft slippers', 'Sea sandals', 'Moon shoes', 'Crescent heels']
const crowns = ['Star crown', 'Shell tiara', 'Leaf circlet', 'Book crown', 'Moon halo']
const capes = ['Cloud cape', 'Wave cape', 'Petal cape', 'Magic cloak']
const hairs = ['Pink', 'Blue', 'Gold', 'Lavender', 'Sea green']

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)]
}

export default function DressUp() {
  const [outfit, setOutfit] = useLocalStorage(STORAGE_KEYS.outfit, {
    dress: dresses[0],
    shoes: shoes[0],
    crown: crowns[0],
    cape: capes[0],
    hair: hairs[0],
    wand: 'Sparkle wand',
  })

  const handleChange = (key, value) => {
    setOutfit((prev) => ({ ...prev, [key]: value }))
  }

  const randomize = () => {
    setOutfit({
      dress: randomItem(dresses),
      shoes: randomItem(shoes),
      crown: randomItem(crowns),
      cape: randomItem(capes),
      hair: randomItem(hairs),
      wand: `${randomItem(['Twinkle', 'Ocean', 'Forest', 'Moon', 'Star'])} wand`,
    })
  }

  const outfitText = useMemo(
    () => `Sylvie wears ${outfit.dress} with ${outfit.shoes}, a ${outfit.crown}, ${outfit.cape}, and ${outfit.hair} hair.`,
    [outfit],
  )

  return (
    <div className="space-y-6 pb-10">
      <PageCard title="Princess Dress-Up" subtitle="Make an original magical outfit." icon="👗">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-soft">
            {[
              { label: 'Dress', key: 'dress', options: dresses },
              { label: 'Shoes', key: 'shoes', options: shoes },
              { label: 'Crown', key: 'crown', options: crowns },
              { label: 'Cape', key: 'cape', options: capes },
              { label: 'Hair colour', key: 'hair', options: hairs },
            ].map((item) => (
              <label key={item.key} className="block rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
                <select
                  value={outfit[item.key]}
                  onChange={(event) => handleChange(item.key, event.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-300"
                >
                  {item.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            ))}
            <label className="block rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <span className="text-sm font-medium text-slate-700">Wand</span>
              <input
                type="text"
                value={outfit.wand}
                onChange={(event) => handleChange('wand', event.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-300"
                aria-label="Wand name"
              />
            </label>
            <button
              type="button"
              onClick={randomize}
              className="w-full rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
            >
              Random Magical Outfit
            </button>
          </div>
          <div className="rounded-[2rem] border border-white/80 bg-pastel-blue/70 p-6 shadow-soft">
            <div className="rounded-[2rem] bg-white/90 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Current outfit</p>
              <p className="mt-4 text-lg font-semibold text-slate-900">{outfit.dress}</p>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>👠 {outfit.shoes}</li>
                <li>👑 {outfit.crown}</li>
                <li>🧥 {outfit.cape}</li>
                <li>💇 {outfit.hair} hair</li>
                <li>✨ {outfit.wand}</li>
              </ul>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">{outfitText}</p>
          </div>
        </div>
      </PageCard>
    </div>
  )
}
