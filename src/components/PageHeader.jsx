import { Link } from 'react-router-dom'
import { useAppState } from '../hooks/useAppState'

export default function PageHeader({ title, eyebrow, children }) {
  const { settings } = useAppState()
  const showCopy = settings.readingSupport !== 'picture'

  return (
    <section className="page-header mb-5 rounded-lg border border-white/80 bg-white/85 p-5 shadow-soft backdrop-blur">
      <Link
        to="/"
        className="mb-4 inline-flex min-h-11 items-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm"
      >
        Home
      </Link>
      <p className="page-eyebrow text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
        {title}
      </h1>
      {children && showCopy ? (
        <div className="page-header-copy mt-3 max-w-3xl text-base leading-7 text-slate-700">
          {children}
        </div>
      ) : null}
    </section>
  )
}
