import { Link } from 'react-router-dom'

export default function BigButton({ to, onClick, icon, label, description, className = '' }) {
  const content = (
    <div className={`group flex w-full flex-col items-start rounded-[2rem] border border-white/80 bg-white/90 p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-xl ${className}`}>
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-3xl bg-pastel-blue text-3xl shadow-sm transition group-hover:bg-pastel-pink">
        <span>{icon}</span>
      </div>
      <span className="text-lg font-semibold text-slate-900">{label}</span>
      {description ? <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p> : null}
    </div>
  )

  if (to) {
    return (
      <Link to={to} className="no-underline">
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className="w-full p-0">
      {content}
    </button>
  )
}
