export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6 rounded-3xl border border-white/80 bg-white/80 p-6 shadow-soft backdrop-blur">
      <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{subtitle}</p>
    </div>
  )
}
