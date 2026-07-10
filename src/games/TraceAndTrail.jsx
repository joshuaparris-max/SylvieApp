import { useMemo, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'

const DONE_KEY = 'sylvieapp:trace-trail-done'

const trails = [
  { id: 'line', level: 1, points: [[70, 180], [150, 180], [230, 180], [310, 180], [390, 180], [470, 180]] },
  { id: 'curve', level: 1, points: [[80, 220], [150, 150], [240, 130], [330, 150], [460, 220]] },
  { id: 'circle', level: 1, points: [[280, 80], [390, 130], [390, 250], [280, 300], [170, 250], [170, 130], [280, 80]] },
  { id: 'zigzag', level: 2, points: [[70, 90], [170, 280], [270, 90], [370, 280], [470, 90]] },
  { id: 'wave', level: 2, points: [[60, 180], [140, 100], [220, 260], [300, 100], [380, 260], [470, 180]] },
]

function readDone() {
  try {
    return Number(localStorage.getItem(DONE_KEY) || 0)
  } catch {
    return 0
  }
}

function pathFrom(points) {
  return points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')
}

function distance(a, b) {
  return Math.hypot(a.x - b[0], a.y - b[1])
}

export default function TraceAndTrail() {
  const [done, setDone] = useState(readDone)
  const [trailIndex, setTrailIndex] = useState(0)
  const [progress, setProgress] = useState(1)
  const [dragging, setDragging] = useState(false)
  const [celebrate, setCelebrate] = useState(false)
  const svgRef = useRef(null)

  const unlockedLevel = done >= 4 ? 2 : 1
  const available = trails.filter((trail) => trail.level <= unlockedLevel)
  const trail = available[trailIndex % available.length]
  const litPoints = trail.points.slice(0, progress)
  const bugPoint = litPoints[litPoints.length - 1] || trail.points[0]

  const dottedPath = useMemo(() => pathFrom(trail.points), [trail])
  const litPath = useMemo(() => pathFrom(litPoints), [litPoints])

  const pointFromEvent = (event) => {
    const svg = svgRef.current
    if (!svg) return null
    const rect = svg.getBoundingClientRect()
    return {
      x: ((event.clientX - rect.left) / rect.width) * 540,
      y: ((event.clientY - rect.top) / rect.height) * 360,
    }
  }

  const move = (event) => {
    if (!dragging || celebrate) return
    const point = pointFromEvent(event)
    const target = trail.points[Math.min(progress, trail.points.length - 1)]
    if (!point || !target) return
    if (distance(point, target) <= 70) {
      const next = progress + 1
      setProgress(next)
      if (next >= trail.points.length) {
        setCelebrate(true)
        const nextDone = done + 1
        setDone(nextDone)
        try {
          localStorage.setItem(DONE_KEY, String(nextDone))
        } catch {
          // Optional persistence.
        }
        window.setTimeout(() => {
          setTrailIndex((current) => current + 1)
          setProgress(1)
          setCelebrate(false)
        }, 1200)
      }
    }
  }

  return (
    <div>
      <PageHeader title="Trace and Trail" eyebrow={`Level ${unlockedLevel}`}>
        <p>Guide the ladybug along the glowing trail.</p>
      </PageHeader>

      <section className={`learning-game-stage trace-trail ${celebrate ? 'celebrate' : ''}`}>
        <svg
          ref={svgRef}
          className="trace-board"
          viewBox="0 0 540 360"
          role="img"
          aria-label="Forgiving tracing path"
          onPointerDown={(event) => {
            setDragging(true)
            move(event)
          }}
          onPointerMove={move}
          onPointerUp={() => setDragging(false)}
          onPointerLeave={() => setDragging(false)}
        >
          <rect width="540" height="360" rx="24" className="trace-sky" />
          <path d={dottedPath} className="trace-tolerance" />
          <path d={dottedPath} className="trace-dots" />
          {litPoints.length > 1 ? <path d={litPath} className="trace-lit" /> : null}
          {litPoints.map(([x, y], index) => (
            <circle key={`${trail.id}-${index}`} cx={x} cy={y} r="7" className="trace-spark" />
          ))}
          <g transform={`translate(${bugPoint[0]} ${bugPoint[1]})`} className="trace-bug">
            <circle r="24" />
            <line x1="0" y1="-22" x2="0" y2="22" />
            <circle cx="-8" cy="-6" r="4" />
            <circle cx="8" cy="-6" r="4" />
          </g>
        </svg>

        <div className="learning-streak">
          <span>{done} trails</span>
          <span>{celebrate ? 'sparkle!' : 'wide path'}</span>
        </div>
      </section>
    </div>
  )
}
