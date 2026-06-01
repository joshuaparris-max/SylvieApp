import { useMemo, useRef, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { coloringPages, palette } from '../data/content'
import { useAppState } from '../hooks/useAppState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'

const size = 12
const cellCount = size * size

const lineArt = {
  fairy: [16, 17, 28, 29, 30, 39, 40, 41, 52, 64, 76, 77, 78, 88, 90],
  castle: [15, 17, 19, 27, 29, 31, 39, 40, 41, 42, 43, 51, 55, 63, 67, 75, 79, 87, 88, 89, 90, 91],
  farm: [26, 27, 28, 37, 39, 48, 49, 50, 73, 74, 75, 76, 86, 87, 88],
  truck: [51, 52, 53, 54, 55, 63, 67, 68, 69, 70, 75, 76, 82, 83],
  mermaid: [17, 28, 29, 40, 41, 52, 64, 76, 77, 89, 101, 102, 103],
  crown: [39, 41, 43, 51, 52, 53, 54, 55, 63, 64, 65, 66, 67],
  wand: [19, 31, 43, 55, 67, 79, 91, 20, 30, 32, 42],
  trampoline: [75, 76, 77, 78, 79, 80, 62, 69, 86, 93, 98, 99],
  swing: [16, 19, 28, 31, 40, 43, 52, 55, 64, 65, 66, 67],
  garden: [38, 40, 42, 50, 52, 54, 62, 64, 66, 86, 87, 88, 89, 90],
}

function blankPage() {
  return Array.from({ length: cellCount }, () => '')
}

export default function ColouringRoom() {
  const { awardStars } = useAppState()
  const [pageId, setPageId] = useState(coloringPages[0].id)
  const [selectedColor, setSelectedColor] = useState(palette[0])
  const [isErasing, setIsErasing] = useState(false)
  const [isPainting, setIsPainting] = useState(false)
  const [drawings, setDrawings] = useLocalStorage(STORAGE_KEYS.drawings, {})
  const isPaintingRef = useRef(false)
  const lastPaintedCellRef = useRef(null)

  const currentDrawing = useMemo(
    () => drawings[pageId] || blankPage(),
    [drawings, pageId],
  )
  const outlines = lineArt[pageId] || []

  const paintCell = (index) => {
    if (!Number.isInteger(index) || index < 0 || index >= cellCount) return

    setDrawings((current) => {
      const page = current[pageId] || blankPage()
      const nextPage = [...page]
      nextPage[index] = isErasing ? '' : selectedColor
      return { ...current, [pageId]: nextPage }
    })
  }

  const getCellIndexFromPoint = (event) => {
    const element = document.elementFromPoint(event.clientX, event.clientY)
    const cell = element?.closest('[data-cell-index]')
    if (!cell) return null
    return Number(cell.dataset.cellIndex)
  }

  const startPainting = (event) => {
    event.preventDefault()
    const index = getCellIndexFromPoint(event)
    if (index === null) return

    isPaintingRef.current = true
    lastPaintedCellRef.current = null
    setIsPainting(true)

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId)
    }

    paintIfNeeded(index)
  }

  const stopPainting = (event) => {
    isPaintingRef.current = false
    lastPaintedCellRef.current = null
    setIsPainting(false)

    if (
      event?.currentTarget?.hasPointerCapture?.(event.pointerId) &&
      event.currentTarget.releasePointerCapture
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const paintIfNeeded = (index) => {
    if (lastPaintedCellRef.current === index) return
    lastPaintedCellRef.current = index
    paintCell(index)
  }

  const handlePointerMove = (event) => {
    if (!isPaintingRef.current) return
    event.preventDefault()
    const index = getCellIndexFromPoint(event)
    if (index === null) return
    paintIfNeeded(index)
  }

  const clearPage = () => {
    setDrawings((current) => ({ ...current, [pageId]: blankPage() }))
  }

  const saveDrawing = () => {
    setDrawings((current) => ({ ...current, [pageId]: currentDrawing }))
    awardStars(1, 'Drawing saved.')
  }

  const downloadDrawing = () => {
    const canvas = document.createElement('canvas')
    const scale = 40
    canvas.width = size * scale
    canvas.height = size * scale
    const context = canvas.getContext('2d')

    context.fillStyle = '#fffaf2'
    context.fillRect(0, 0, canvas.width, canvas.height)
    currentDrawing.forEach((color, index) => {
      const x = (index % size) * scale
      const y = Math.floor(index / size) * scale
      context.fillStyle = color || '#ffffff'
      context.fillRect(x, y, scale, scale)
      if (outlines.includes(index)) {
        context.strokeStyle = '#334155'
        context.lineWidth = 4
        context.strokeRect(x + 5, y + 5, scale - 10, scale - 10)
      }
    })

    const link = document.createElement('a')
    link.download = `sylvie-${pageId}-drawing.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div onPointerUp={stopPainting} onPointerCancel={stopPainting}>
      <PageHeader title="Colouring Room" eyebrow="Paint and save">
        <p>Big colours and original simple pages for quiet creative play.</p>
      </PageHeader>

      <section className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-4">
          <section className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
            <h2 className="panel-title">Page</h2>
            <div className="grid grid-cols-2 gap-2">
              {coloringPages.map((page) => (
                <button
                  key={page.id}
                  type="button"
                  className={`choice-chip ${pageId === page.id ? 'selected' : ''}`}
                  onClick={() => setPageId(page.id)}
                >
                  {page.name}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
            <h2 className="panel-title">Colours</h2>
            <div className="grid grid-cols-4 gap-2">
              {palette.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`color-swatch ${
                    selectedColor === color && !isErasing ? 'selected' : ''
                  } touch-target`}
                  style={{ background: color }}
                  onClick={() => {
                    setSelectedColor(color)
                    setIsErasing(false)
                  }}
                  aria-label={`Choose colour ${color}`}
                />
              ))}
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                className={`btn-secondary ${isErasing ? 'ring-2 ring-slate-700' : ''}`}
                onClick={() => setIsErasing(true)}
              >
                Eraser
              </button>
              <button type="button" className="btn-secondary" onClick={clearPage}>
                Clear page
              </button>
              <button type="button" className="btn-primary" onClick={saveDrawing}>
                Save drawing
              </button>
              <button type="button" className="btn-secondary" onClick={downloadDrawing}>
                Download PNG
              </button>
            </div>
          </section>
        </div>

        <section className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
          <div
            className="coloring-grid"
            aria-label={`${pageId} colouring page`}
            data-painting={isPainting ? 'true' : 'false'}
            onPointerDown={startPainting}
            onPointerMove={handlePointerMove}
            onPointerUp={stopPainting}
            onPointerCancel={stopPainting}
          >
            {currentDrawing.map((color, index) => (
              <button
                key={index}
                type="button"
                data-cell-index={index}
                className={`color-cell ${outlines.includes(index) ? 'outline-cell' : ''}`}
                style={{ backgroundColor: color || '#ffffff' }}
                aria-label={`Colouring cell ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}
