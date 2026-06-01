import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { useAppState } from '../hooks/useAppState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'

const matchingGames = [
  {
    id: 'shapes',
    title: 'Shape matching',
    left: [
      { id: 'circle', label: 'Circle' },
      { id: 'square', label: 'Square' },
      { id: 'triangle', label: 'Triangle' },
    ],
    right: [
      { id: 'square', label: 'Square home' },
      { id: 'triangle', label: 'Triangle home' },
      { id: 'circle', label: 'Circle home' },
    ],
  },
  {
    id: 'colours',
    title: 'Colour matching',
    left: [
      { id: 'rose', label: 'Rose' },
      { id: 'sun', label: 'Sun' },
      { id: 'sky', label: 'Sky' },
    ],
    right: [
      { id: 'sky', label: 'Blue patch' },
      { id: 'rose', label: 'Pink patch' },
      { id: 'sun', label: 'Yellow patch' },
    ],
  },
  {
    id: 'farm',
    title: 'Farm animal matching',
    left: [
      { id: 'hen', label: 'Honey Hen' },
      { id: 'lamb', label: 'Button Lamb' },
      { id: 'duck', label: 'Puddle Duck' },
    ],
    right: [
      { id: 'duck', label: 'Little pond' },
      { id: 'hen', label: 'Cozy nest' },
      { id: 'lamb', label: 'Soft meadow' },
    ],
  },
  {
    id: 'princess',
    title: 'Princess item matching',
    left: [
      { id: 'crown', label: 'Crown' },
      { id: 'wand', label: 'Wand' },
      { id: 'shoe', label: 'Shoe' },
    ],
    right: [
      { id: 'wand', label: 'Sparkle shelf' },
      { id: 'shoe', label: 'Dressing rug' },
      { id: 'crown', label: 'Velvet cushion' },
    ],
  },
]

const picturePieces = [
  { id: 'sky', label: 'Sky piece' },
  { id: 'tower', label: 'Tower piece' },
  { id: 'path', label: 'Path piece' },
  { id: 'garden', label: 'Garden piece' },
]

const missingChoices = [
  { id: 'cloud', label: 'Cloud' },
  { id: 'door', label: 'Castle door' },
  { id: 'leaf', label: 'Leaf' },
]

const defaultProgress = {
  completed: [],
  picture: {},
  missingFound: false,
}

export default function PuzzlePlay() {
  const { awardStars } = useAppState()
  const [progress, setProgress] = useLocalStorage(
    STORAGE_KEYS.puzzles,
    defaultProgress,
  )
  const [gameId, setGameId] = useState(matchingGames[0].id)
  const [selected, setSelected] = useState(null)
  const [matched, setMatched] = useState({})
  const [selectedPiece, setSelectedPiece] = useState(null)
  const [message, setMessage] = useState('Choose a piece, then choose its home.')

  const game = matchingGames.find((item) => item.id === gameId) || matchingGames[0]

  const changeGame = (id) => {
    setGameId(id)
    setSelected(null)
    setMatched({})
    setMessage('Choose a piece, then choose its home.')
  }

  const completePuzzle = (id, reason) => {
    if (progress.completed.includes(id)) return
    setProgress((current) => ({
      ...current,
      completed: [...current.completed, id],
    }))
    awardStars(1, reason)
  }

  const chooseRight = (rightId) => {
    if (!selected) return
    if (selected.id !== rightId) {
      setMessage('Try another gentle match.')
      return
    }

    const nextMatched = { ...matched, [selected.id]: rightId }
    setMatched(nextMatched)
    setSelected(null)
    setMessage('Great matching!')

    if (Object.keys(nextMatched).length === game.left.length) {
      completePuzzle(game.id, `${game.title} finished.`)
    }
  }

  const placePicturePiece = (pieceId, slotId) => {
    if (pieceId !== slotId) {
      setMessage('That piece wants a different spot.')
      return
    }

    const nextPicture = { ...progress.picture, [slotId]: pieceId }
    setProgress((current) => ({ ...current, picture: nextPicture }))
    setSelectedPiece(null)
    setMessage('The picture is growing.')

    if (picturePieces.every((piece) => nextPicture[piece.id] === piece.id)) {
      completePuzzle('picture', 'Picture puzzle finished.')
    }
  }

  const findMissing = (choiceId) => {
    if (choiceId !== 'door') {
      setMessage('Look for the piece that finishes the castle.')
      return
    }
    setProgress((current) => ({ ...current, missingFound: true }))
    completePuzzle('missing', 'Missing piece found.')
    setMessage('You found the missing piece.')
  }

  return (
    <div>
      <PageHeader title="Puzzle Play" eyebrow="Gentle thinking">
        <p>{message}</p>
      </PageHeader>

      <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          <section className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
            <h2 className="panel-title">Puzzle type</h2>
            <div className="grid gap-2">
              {matchingGames.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`choice-chip ${gameId === item.id ? 'selected' : ''}`}
                  onClick={() => changeGame(item.id)}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
            <h2 className="panel-title">Progress</h2>
            <p className="text-sm leading-6 text-slate-600">
              Completed puzzles: {progress.completed.length}
            </p>
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
            <h2 className="panel-title">{game.title}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-2">
                {game.left.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`puzzle-piece ${
                      selected?.id === item.id ? 'selected' : ''
                    } ${matched[item.id] ? 'matched' : ''}`}
                    onClick={() => setSelected(item)}
                    disabled={Boolean(matched[item.id])}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="grid gap-2">
                {game.right.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="puzzle-home"
                    onClick={() => chooseRight(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
            <h2 className="panel-title">Picture puzzle</h2>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="grid grid-cols-2 gap-2">
                {picturePieces.map((piece) => (
                  <button
                    key={piece.id}
                    type="button"
                    draggable
                    className={`picture-piece picture-${piece.id} ${
                      selectedPiece === piece.id ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedPiece(piece.id)}
                    onDragStart={(event) => {
                      event.dataTransfer.setData('text/plain', piece.id)
                      setSelectedPiece(piece.id)
                    }}
                  >
                    {piece.label}
                  </button>
                ))}
              </div>
              <div className="picture-board">
                {picturePieces.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    className={`picture-slot picture-${slot.id}`}
                    onClick={() => selectedPiece && placePicturePiece(selectedPiece, slot.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault()
                      placePicturePiece(event.dataTransfer.getData('text/plain'), slot.id)
                    }}
                  >
                    {progress.picture[slot.id] ? slot.label : 'Drop here'}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-white/80 bg-white/90 p-4 shadow-soft">
            <h2 className="panel-title">Find the missing piece</h2>
            <div className="missing-scene" aria-hidden="true">
              <span className="missing-castle" />
              <span className={progress.missingFound ? 'missing-door found' : 'missing-door'} />
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {missingChoices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  className="choice-chip"
                  onClick={() => findMissing(choice.id)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
