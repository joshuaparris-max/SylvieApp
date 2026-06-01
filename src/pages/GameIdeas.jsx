import PageHeader from '../components/PageHeader'
import { featureIdeas, gameIdeas } from '../data/content'

export default function GameIdeas() {
  return (
    <div>
      <PageHeader title="Game Ideas" eyebrow="New gentle play">
        <p>Explore the next SylvieApp game ideas and gentle new features we can bring to life.</p>
      </PageHeader>

      <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          <section className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
            <h2 className="panel-title">Fun game concepts</h2>
            <div className="grid gap-3">
              {gameIdeas.map((idea) => (
                <article key={idea.title} className="choice-chip text-left">
                  <strong>{idea.title}</strong>
                  <p className="mt-1 text-sm font-normal text-slate-600">
                    {idea.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
          <h2 className="panel-title">Feature inspiration</h2>
          <div className="grid gap-3">
            {featureIdeas.map((idea) => (
              <article key={idea.title} className="choice-chip text-left">
                <strong>{idea.title}</strong>
                <p className="mt-1 text-sm font-normal text-slate-600">
                  {idea.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}
