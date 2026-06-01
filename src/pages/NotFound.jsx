import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-10">
      <div className="max-w-xl rounded-[2rem] border border-white/80 bg-white/90 p-8 text-center shadow-soft backdrop-blur">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Page not found</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Oops, magic took a turn!</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Let’s go back to the main playground and try another adventure.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
        >
          Back to SylvieApp
        </Link>
      </div>
    </main>
  )
}
