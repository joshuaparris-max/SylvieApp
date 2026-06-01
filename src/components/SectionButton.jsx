import { Link } from 'react-router-dom'

export default function SectionButton({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="group rounded-3xl border border-white/70 bg-white/80 p-5 text-left shadow-soft backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
      aria-label={title}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-pastel-blue text-3xl shadow-sm transition group-hover:bg-pastel-pink">
        <span>{icon}</span>
      </div>
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </Link>
  )
}
