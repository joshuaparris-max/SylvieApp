import { useAppState } from '../hooks/useAppState'

export default function RewardToast() {
  const { reward } = useAppState()

  if (!reward) return null

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,24rem)] -translate-x-1/2 rounded-lg border border-amber-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-800 shadow-soft"
      role="status"
      aria-live="polite"
    >
      {reward.amount > 0
        ? `${reward.amount} new idea${reward.amount === 1 ? '' : 's'} saved. `
        : ''}
      {reward.reason}
    </div>
  )
}
