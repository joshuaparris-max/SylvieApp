import { Link } from 'react-router-dom'
import FavoritePicture from '../components/FavoritePicture'
import PlayIcon from '../components/PlayIcon'
import { favoritePictures, homeSections } from '../data/content'
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
            Discover fairies, farm play, princess outfits, colouring pages, block building, puzzles, original piglet and puppy pals, a friendly sorting truck, swings, and trampoline fun.
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

      <section className="favorite-gallery" aria-labelledby="favorite-gallery-title">
        <div className="favorite-gallery-heading">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-700">
            Original pictures
          </p>
          <h2 id="favorite-gallery-title" className="text-2xl font-black text-slate-950">
            Things Sylvie loves
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            These are SylvieApp originals inspired by her favourite kinds of play.
          </p>
        </div>
        <div className="favorite-picture-grid">
          {favoritePictures.map((picture) => (
            <article key={picture.id} className="favorite-picture-card">
              <FavoritePicture kind={picture.kind} title={picture.title} />
              <div className="p-3">
                <h3 className="text-base font-black text-slate-950">{picture.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {picture.description}
                </p>
              </div>
            </article>
          ))}
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
