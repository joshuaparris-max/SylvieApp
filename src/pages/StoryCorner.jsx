import { useState } from 'react'
import PageCard from '../components/PageCard'
import { stories } from '../data/storyData'

export default function StoryCorner() {
  const [current, setCurrent] = useState(stories[0])
  const [pageIndex, setPageIndex] = useState(0)
  const [ending, setEnding] = useState('')

  const handleChoice = (next) => {
    setPageIndex(next)
    const newEnding = current.endings[next - 1] || ''
    setEnding(newEnding)
  }

  const resetStory = () => {
    setCurrent(stories[0])
    setPageIndex(0)
    setEnding('')
  }

  return (
    <div className="space-y-6 pb-10">
      <PageCard title="Story Corner" subtitle="Enjoy short interactive tales with gentle choices." icon="📖">
        <div className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-soft">
          <p className="text-sm text-slate-500">Story:</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{current.title}</h2>
          <div className="mt-5 space-y-4 rounded-[2rem] bg-pastel-blue/70 p-5 text-slate-700 shadow-sm">
            {current.text.map((line, index) => (
              <p key={index} className="text-sm leading-7">{line}</p>
            ))}
            {ending && <p className="rounded-3xl bg-white/90 p-4 text-sm text-slate-800">{ending}</p>}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {current.choices.map((choice, index) => (
              <button
                key={choice.label}
                type="button"
                onClick={() => handleChoice(choice.next)}
                className="rounded-full bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
              >
                {choice.label}
              </button>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => setCurrent(stories[(stories.indexOf(current) + 1) % stories.length])}
              className="rounded-full bg-pastel-green px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-pastel-green/90"
            >
              Next story
            </button>
            <button
              type="button"
              onClick={resetStory}
              className="rounded-full bg-pastel-pink px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-pastel-pink/90"
            >
              Restart
            </button>
          </div>
        </div>
      </PageCard>
    </div>
  )
}
