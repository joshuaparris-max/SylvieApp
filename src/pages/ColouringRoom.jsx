import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'
import PageCard from '../components/PageCard'

const palette = ['#f8c7e6', '#b8e0ff', '#c6f7d7', '#ffe4b8', '#d9c6ff', '#ffffff', '#a2a2a8', '#fbb6b7']

export default function ColouringRoom() {
  const canvasRef = useRef(null)
  const [drawingData, setDrawingData] = useLocalStorage(STORAGE_KEYS.drawing, null)
  const [color, setColor] = useState(palette[0])
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (drawingData) {
      const image = new Image()
      image.onload = () => ctx.drawImage(image, 0, 0)
      image.src = drawingData
    }
  }, [drawingData])

  const getCoordinates = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return { x, y }
  }

  const startDrawing = (event) => {
    setIsDrawing(true)
    draw(event)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    saveImage()
  }

  const draw = (event) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const { x, y } = getCoordinates(event)
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI * 2)
    ctx.fill()
  }

  const saveImage = () => {
    const canvas = canvasRef.current
    setDrawingData(canvas.toDataURL('image/png'))
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setDrawingData(null)
  }

  const downloadDrawing = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = 'sylvie-drawing.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="space-y-6 pb-10">
      <PageCard title="Colouring Room" subtitle="Colour a happy page and save your artwork." icon="🎨">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-soft">
            <canvas
              ref={canvasRef}
              width={700}
              height={500}
              className="w-full rounded-[2rem] border border-slate-200 bg-white shadow-inner"
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onMouseMove={draw}
              aria-label="Colouring canvas"
            />
            <div className="mt-4 flex flex-wrap gap-3">
              {palette.map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  onClick={() => setColor(swatch)}
                  className={`h-10 w-10 rounded-full border-2 ${color === swatch ? 'border-slate-700' : 'border-white'}`}
                  style={{ backgroundColor: swatch }}
                  aria-label={`Choose colour ${swatch}`}
                />
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-[2rem] border border-white/80 bg-pastel-blue/60 p-5 shadow-soft">
            <div className="rounded-[2rem] bg-white/90 p-5 shadow-sm">
              <p className="text-sm text-slate-500">Use the canvas like a big crayon.</p>
              <p className="mt-3 text-slate-900">Pick a colour, draw with gentle strokes, and save your favourite page.</p>
            </div>
            <button
              type="button"
              onClick={saveImage}
              className="w-full rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
            >
              Save drawing
            </button>
            <button
              type="button"
              onClick={downloadDrawing}
              className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
            >
              Download PNG
            </button>
            <button
              type="button"
              onClick={clearCanvas}
              className="w-full rounded-full bg-pastel-pink px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-pastel-pink/90"
            >
              Clear page
            </button>
            <p className="rounded-3xl bg-white/80 p-4 text-sm text-slate-600">Saved drawing is kept in SylvieApp until you clear it.</p>
          </div>
        </div>
      </PageCard>
    </div>
  )
}
