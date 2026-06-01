import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppStateProvider from './components/AppStateProvider'
import AppShell from './components/AppShell'
import CalmDown from './pages/CalmDown'
import Home from './pages/Home'
import ParentSettings from './pages/ParentSettings'
import BlockBuilder from './games/BlockBuilder'
import ColouringRoom from './games/ColouringRoom'
import FairyGarden from './games/FairyGarden'
import FarmAdventure from './games/FarmAdventure'
import PrincessDressUp from './games/PrincessDressUp'
import PuzzlePlay from './games/PuzzlePlay'
import StoryCorner from './games/StoryCorner'
import TrampolineSwingBreak from './games/TrampolineSwingBreak'
import SortingTruck from './games/SortingTruck'

function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="fairy-garden" element={<FairyGarden />} />
            <Route path="farm-adventure" element={<FarmAdventure />} />
            <Route path="princess-dress-up" element={<PrincessDressUp />} />
            <Route path="colouring-room" element={<ColouringRoom />} />
            <Route path="puzzle-play" element={<PuzzlePlay />} />
            <Route path="block-builder" element={<BlockBuilder />} />
            <Route path="sorting-truck" element={<SortingTruck />} />
            <Route path="trampoline-swing-break" element={<TrampolineSwingBreak />} />
            <Route path="story-corner" element={<StoryCorner />} />
            <Route path="parent-settings" element={<ParentSettings />} />
            <Route path="calm-down" element={<CalmDown />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AppStateProvider>
    </BrowserRouter>
  )
}

export default App
