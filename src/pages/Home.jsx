import { Link } from 'react-router-dom'
import { useState } from 'react'
import FavoritePicture from '../components/FavoritePicture'
import PlayIcon from '../components/PlayIcon'
import { favoritePictures, homeSections } from '../data/content'
import { useAppState } from '../hooks/useAppState'

const LAST_PATH_KEY = 'sylvieapp:last-path'

function getContinuePath() {
  try {
    const stored = localStorage.getItem(LAST_PATH_KEY)
    return stored && stored !== '/' ? stored : ''
  } catch {
    return ''
  }
}

export default function Home() {
  const { settings, stars } = useAppState()
  const isSimpleMode = settings.screenDetail === 'simple'
  const isParentMode = settings.audienceMode === 'parent'
  const [continuePath] = useState(getContinuePath)
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
          <p className="mt-4 text-sm font-semibold text-emerald-700">
            You’ve collected {stars} star{stars === 1 ? '' : 's'} so far.
          </p>
          {continuePath ? (
            <Link
              to={continuePath}
              className="inline-flex items-center gap-2 mt-4 rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-800 hover:bg-rose-200"
            >
              Continue last activity
            </Link>
          ) : null}
          {!isSimpleMode ? (
            <p className="child-copy mt-3 text-sm text-slate-600">
              Discover fairies, farm play, princess outfits, colouring pages, block building, puzzles, original piglet and puppy pals, a friendly sorting truck, swings, and trampoline fun.
            </p>
          ) : null}
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

      <section className="favorite-gallery" aria-labelledby="favorite-gallery-title">
        <div className="favorite-gallery-heading">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">
            Original pictures
          </p>
          <h2 id="favorite-gallery-title" className="text-2xl font-black text-slate-950">
            Things Sylvie loves
          </h2>
          <p className="child-copy mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            These are SylvieApp originals inspired by her favourite kinds of play.
          </p>
        </div>
        <div className="favorite-picture-grid">
          {favoritePictures.map((picture) => (
            <Link
              key={picture.id}
              to={`/things-sylvie-loves/${picture.id}`}
              className="favorite-picture-card"
              aria-label={`Open ${picture.title} activity`}
            >
              <FavoritePicture kind={picture.kind} title={picture.title} />
              <div className="p-3">
                <h3 className="text-base font-black text-slate-950">{picture.title}</h3>
                <p className="favorite-description mt-1 text-sm leading-6 text-slate-600">
                  {picture.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="App sections">
        {homeSections.map((section) => (
          <article key={section.path} className={`section-card tone-${section.tone}`}>
            <Link to={section.path} className="block text-inherit no-underline">
              <span className="section-icon">
                <PlayIcon name={section.icon} className="h-10 w-10" />
              </span>
              <span className="mt-4 block text-xl font-black text-slate-950">
                {section.title}
              </span>
              <span className="section-summary mt-2 block text-sm leading-6 text-slate-700">
                {section.summary}
              </span>
            </Link>
            {isParentMode ? (
              <details className="mt-3 rounded-lg bg-white/70 px-3 py-2 text-sm text-slate-600">
                <summary className="cursor-pointer font-black text-slate-800">
                  Grown-up note
                </summary>
                <p className="mt-2 leading-6">{section.why}</p>
                <p className="mt-2 leading-6">
                  <strong>Try:</strong> {section.parentCue}
                </p>
              </details>
            ) : null}
          </article>
        ))}
      </section>
    </div>
  )
}
