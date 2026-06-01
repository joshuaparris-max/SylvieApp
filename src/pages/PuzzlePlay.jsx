import { useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'
import PageCard from '../components/PageCard'

const shapes = ['circle', 'square', 'triangle']
const colours = ['pink', 'blue', 'green']
const animals = ['cow', 'sheep', 'chicken']
const princessItems = ['wand', 'crown', 'book']

function scoreMatch(answer, selection) {
  return answer === selection
}

export default function PuzzlePlay({ addStars }) {
  const [progress, setProgress] = useLocalStorage(STORAGE_KEYS.puzzle, {
    shapes: false,
    colours: false,
    animals: false,
    princess: false,
  })
  const [selected, setSelected] = useState({ type: '', value: '' })
  const [message, setMessage] = useState('Choose a puzzle and match the pair!')

  const currentShape = useMemo(() => shapes[Math.floor(Math.random() * shapes.length)], [])
  const currentColour = useMemo(() => colours[Math.floor(Math.random() * colours.length)], [])
  const currentAnimal = useMemo(() => animals[Math.floor(Math.random() * animals.length)], [])
  const currentPrincess = useMemo(() => princessItems[Math.floor(Math.random() * princessItems.length)], [])

  const handleMatch = (type, value) => {
    setSelected({ type, value })
    const answer = { shapes: currentShape, colours: currentColour, animals: currentAnimal, princess: currentPrincess }[type]
    const success = scoreMatch(answer, value)
    if (success) {
      setMessage('Great! You matched the puzzle.')
      setProgress((prev) => {
        if (!prev[type]) {
          addStars(1)
        }
        return { ...prev, [type]: true }
      })
    } else {
      setMessage('Good try — keep going.')
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <PageCard title="Puzzle Play" subtitle="Enjoy kind matching games with soft encouragement." icon="🧩">
        <div className="space-y-4 rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-soft">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-pastel-blue/70 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Shape matching</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {shapes.map((shape) => (
                  <button
                    key={shape}
                    type="button"
                    onClick={() => handleMatch('shapes', shape)}
                    className="rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm"
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-pastel-pink/70 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Colour matching</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {colours.map((colour) => (
                  <button
                    key={colour}
                    type="button"
                    onClick={() => handleMatch('colours', colour)}
                    className="rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm"
                  >
                    {colour}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-pastel-green/70 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Farm animal matching</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {animals.map((animal) => (
                  <button
                    key={animal}
                    type="button"
                    onClick={() => handleMatch('animals', animal)}
                    className="rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm"
                  >
                    {animal}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-pastel-lavender/70 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Princess item matching</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {princessItems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleMatch('princess', item)}
                    className="rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="rounded-3xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{message}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Completed</p>
              <ul className="mt-3 space-y-2">
                <li>Shapes: {progress.shapes ? 'yes' : 'soon'}</li>
                <li>Colours: {progress.colours ? 'yes' : 'soon'}</li>
                <li>Animals: {progress.animals ? 'yes' : 'soon'}</li>
                <li>Princess: {progress.princess ? 'yes' : 'soon'}</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-4 text-sm text-slate-600 shadow-sm">
              <p className="font-semibold text-slate-900">Extra note</p>
              <p className="mt-3">This game is forgiving and kind. Every choice helps Sylvie learn and feel proud.</p>
            </div>
          </div>
        </div>
      </PageCard>
    </div>
  )
}
