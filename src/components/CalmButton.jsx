export default function CalmButton({ onClick, label = 'Calm Down' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-pastel-pink px-5 py-3 text-sm font-semibold text-slate-900 shadow-soft transition hover:bg-pastel-blue"
    >
      {label}
    </button>
  )
}
