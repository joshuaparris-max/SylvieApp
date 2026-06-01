export default function SparkleEffect() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-5 top-8 h-2 w-2 rounded-full bg-white/90 shadow-sm animate-sparkle" />
      <div className="absolute left-32 top-20 h-2 w-2 rounded-full bg-white/80 shadow-sm animate-sparkle delay-200" />
      <div className="absolute right-10 top-28 h-2 w-2 rounded-full bg-white/80 shadow-sm animate-sparkle delay-400" />
      <div className="absolute right-24 top-8 h-2 w-2 rounded-full bg-white/80 shadow-sm animate-sparkle delay-600" />
    </div>
  )
}
