export default function StarCounter({ stars }) {
  return (
    <div className="rounded-3xl border border-white/80 bg-white/90 px-4 py-3 shadow-soft backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Magic Stars</p>
      <div className="mt-1 flex items-center gap-2 text-2xl font-bold text-slate-900">
        <span>⭐</span>
        <span>{stars}</span>
      </div>
      <p className="text-xs text-slate-500">Stars are collected for kind and creative play.</p>
    </div>
  )
}
