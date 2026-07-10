import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppStateProvider from './components/AppStateProvider'
import AppShell from './components/AppShell'
import CalmDown from './pages/CalmDown'
import FavoriteActivity from './pages/FavoriteActivity'
import Home from './pages/Home'
import ParentSettings from './pages/ParentSettings'
import BlockBuilder from './games/BlockBuilder'
import ColouringRoom from './games/ColouringRoom'
import FairyGarden from './games/FairyGarden'
import FarmAdventure from './games/FarmAdventure'
import FeelingsFriends from './games/FeelingsFriends'
import FreezeAndGoGarden from './games/FreezeAndGoGarden'
import MoreOrLessMeadow from './games/MoreOrLessMeadow'
import PatternParade from './games/PatternParade'
import PrincessDressUp from './games/PrincessDressUp'
import PuzzlePlay from './games/PuzzlePlay'
import RhymeTimeTogether from './games/RhymeTimeTogether'
import ShapeFitForest from './games/ShapeFitForest'
import StoryCorner from './games/StoryCorner'
import TrampolineSwingBreak from './games/TrampolineSwingBreak'
import SortingTruck from './games/SortingTruck'
import SparkleCount from './games/SparkleCount'
import StarDanceParty from './games/StarDanceParty'
import GameIdeas from './pages/GameIdeas'
import MemoryMeadow from './games/MemoryMeadow'

function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="fairy-garden" element={<FairyGarden />} />
            <Route path="things-sylvie-loves/:id" element={<FavoriteActivity />} />
            <Route path="farm-adventure" element={<FarmAdventure />} />
            <Route path="feelings-friends" element={<FeelingsFriends />} />
            <Route path="freeze-and-go-garden" element={<FreezeAndGoGarden />} />
            <Route path="memory-meadow" element={<MemoryMeadow />} />
            <Route path="more-or-less-meadow" element={<MoreOrLessMeadow />} />
            <Route path="pattern-parade" element={<PatternParade />} />
            <Route path="princess-dress-up" element={<PrincessDressUp />} />
            <Route path="shape-fit-forest" element={<ShapeFitForest />} />
            <Route path="rhyme-time-together" element={<RhymeTimeTogether />} />
            <Route path="colouring-room" element={<ColouringRoom />} />
            <Route path="puzzle-play" element={<PuzzlePlay />} />
            <Route path="block-builder" element={<BlockBuilder />} />
            <Route path="sorting-truck" element={<SortingTruck />} />
            <Route path="trampoline-swing-break" element={<TrampolineSwingBreak />} />
            <Route path="story-corner" element={<StoryCorner />} />
            <Route path="sparkle-count" element={<SparkleCount />} />
            <Route path="star-dance-party" element={<StarDanceParty />} />
            <Route path="game-ideas" element={<GameIdeas />} />
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
