import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FairyGarden from './pages/FairyGarden'
import FarmAdventure from './pages/FarmAdventure'
import DressUp from './pages/DressUp'
import ColouringRoom from './pages/ColouringRoom'
import PuzzlePlay from './pages/PuzzlePlay'
import BlockBuilder from './pages/BlockBuilder'
import TrashSorter from './pages/TrashSorter'
import BreakTime from './pages/BreakTime'
import StoryCorner from './pages/StoryCorner'
import ParentSettings from './pages/ParentSettings'
import NotFound from './pages/NotFound'
import CalmDownModal from './components/CalmDownModal'
import { useLocalStorage } from './hooks/useLocalStorage'
import { STORAGE_KEYS } from './utils/storage'

function AppLayout({ children, stars, openCalm, onOpenCalm }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue via-white to-pastel-lavender text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-3 rounded-[2rem] border border-white/75 bg-white/80 p-5 shadow-soft backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">SylvieApp</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">A gentle magical play world</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Explore calm games, stories, and simple activities made especially for Sylvie.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className={`rounded-full border border-transparent bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white ${
                location.pathname === '/' ? 'ring-2 ring-pastel-pink' : ''
              }`}
            >
              Home
            </Link>
            <button
              type="button"
              onClick={onOpenCalm}
              className="rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-violet-600"
            >
              Calm Down
            </button>
          </div>
        </header>
        <main>{children}</main>
      </div>
      <CalmDownModal open={openCalm} onClose={() => onOpenCalm(false)} />
    </div>
  )
}

function App() {
  const [stars, setStars] = useLocalStorage(STORAGE_KEYS.stars, 0)
  const [parentSettings, setParentSettings] = useLocalStorage(STORAGE_KEYS.parentSettings, {
    soundsOn: false,
    mode: 'calm',
    passcode: '2468',
    movementBreakMinutes: 20,
    customMessage: 'You are kind and brave.',
    customStoryPrompt: 'A gentle adventure begins when Sylvie uses her imagination.',
  })
  const [calmOpen, setCalmOpen] = useState(false)

  const addStars = (amount) => {
    setStars((current) => Math.max(0, current + amount))
  }

  return (
    <BrowserRouter>
      <AppLayout stars={stars} openCalm={calmOpen} onOpenCalm={setCalmOpen}>
        <Routes>
          <Route path="/" element={<HomePage stars={stars} />} />
          <Route path="/fairy-garden" element={<FairyGarden addStars={addStars} stars={stars} />} />
          <Route path="/farm-adventure" element={<FarmAdventure addStars={addStars} />} />
          <Route path="/dress-up" element={<DressUp />} />
          <Route path="/colouring" element={<ColouringRoom />} />
          <Route path="/puzzle-play" element={<PuzzlePlay addStars={addStars} />} />
          <Route path="/block-builder" element={<BlockBuilder />} />
          <Route path="/trash-sorter" element={<TrashSorter addStars={addStars} />} />
          <Route path="/break-time" element={<BreakTime />} />
          <Route path="/story-corner" element={<StoryCorner />} />
          <Route path="/parent-settings" element={<ParentSettings parentSettings={parentSettings} setParentSettings={setParentSettings} setStars={setStars} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
