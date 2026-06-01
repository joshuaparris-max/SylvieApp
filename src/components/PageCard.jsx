export default function PageCard({ title, subtitle, icon, children }) {
  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-soft backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-pastel-green text-3xl shadow-sm">{icon}</div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
