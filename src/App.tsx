import { AnimatePresence } from "framer-motion"
import Starfield from "./components/Starfield"
import LockScreen from "./sections/LockScreen"
import World from "./sections/World"
import { usePasswordGate } from "./hooks/usePasswordGate"

function App() {
  const { unlocked, attempt } = usePasswordGate()

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-ground">
      <Starfield />
      <AnimatePresence mode="wait">
        {!unlocked ? <LockScreen key="lock" attempt={attempt} /> : <World key="world" />}
      </AnimatePresence>
    </div>
  )
}

export default App
