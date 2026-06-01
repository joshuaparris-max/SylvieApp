import { useAppState } from '../hooks/useAppState'

export default function StarCounter() {
  const { stars } = useAppState()

  return (
    <div
      className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 shadow-sm"
      aria-label={`${stars} stars collected`}
    >
      <span aria-hidden="true" className="text-xl">
        *
      </span>
      <span className="text-lg font-bold">{stars}</span>
      <span className="text-sm font-semibold">stars</span>
    </div>
  )
}
