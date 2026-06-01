import PageHeader from '../components/PageHeader'
import { calmWords } from '../data/content'

export default function CalmDown() {
  return (
    <div>
      <PageHeader title="Calm Down" eyebrow="Breathe slowly">
        <p>Soft words and a slow breathing circle are always here.</p>
      </PageHeader>

      <section className="mx-auto max-w-2xl rounded-lg border border-white/80 bg-white/90 p-6 text-center shadow-soft">
        <div className="breathing-circle mx-auto" aria-hidden="true">
          <span />
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {calmWords.map((word) => (
            <p
              key={word}
              className="rounded-lg border border-sky-100 bg-sky-50 px-4 py-4 text-lg font-black text-slate-800"
            >
              {word}
            </p>
          ))}
        </div>
      </section>
    </div>
  )
}
