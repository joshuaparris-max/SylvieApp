import { Link } from 'react-router-dom'
import PlayIcon from '../components/PlayIcon'
import { homeSections } from '../data/content'
import { useAppState } from '../hooks/useAppState'

export default function Home() {
  const { settings } = useAppState()
  const greeting =
    settings.customEncouragements?.[settings.customEncouragements.length - 1] ||
    'You are loved exactly as you are.'

  return (
    <div className="space-y-5">
      <section className="hero-panel">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.26em] text-rose-700">
            Welcome to
          </p>
          <h1 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">
            SylvieApp
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">{greeting}</p>
          <p className="mt-3 text-sm text-slate-600">
            Discover fairies, farm play, princess outfits, colouring pages, block building, puzzles, a friendly truck, swings, and trampoline fun.
          </p>
        </div>
        <div className="garden-illustration" aria-hidden="true">
          <span className="sun" />
          <span className="hill hill-one" />
          <span className="hill hill-two" />
          <span className="flower f-one" />
          <span className="flower f-two" />
          <span className="flower f-three" />
          <span className="fairy-wing left" />
          <span className="fairy-wing right" />
          <span className="magic-trail" />
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="App sections">
        {homeSections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className={`section-card tone-${section.tone}`}
          >
            <span className="section-icon">
              <PlayIcon name={section.icon} className="h-10 w-10" />
            </span>
            <span className="mt-4 block text-xl font-black text-slate-950">
              {section.title}
            </span>
            <span className="mt-2 block text-sm leading-6 text-slate-700">
              {section.summary}
            </span>
          </Link>
        ))}
      </section>
    </div>
  )
}
