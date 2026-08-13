import { useEffect, useRef, useState } from "react"
import type { PointerEvent as ReactPointerEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import WorldStar from "../components/WorldStar"
import StarDetail from "../components/StarDetail"
import DaysTogetherCounter from "../components/DaysTogetherCounter"
import Arrival from "../components/Arrival"
import JourneyPath from "../components/JourneyPath"
import { site, worldStars, type WorldStar as WorldStarData } from "../content"

const WORLD_WIDTH = 2200
const WORLD_HEIGHT = 1300

const guideStar = worldStars.find((s) => s.guide) ?? worldStars[0]

/** The guided story: follow `next` links from the entry star to build the ordered chain. */
const journeyChain: WorldStarData[] = (() => {
  const chain: WorldStarData[] = []
  const seen = new Set<string>()
  let current: WorldStarData | undefined = guideStar
  while (current && !seen.has(current.id)) {
    chain.push(current)
    seen.add(current.id)
    current = current.next ? worldStars.find((s) => s.id === current!.next) : undefined
  }
  return chain
})()

const journeyIds = new Set(journeyChain.map((s) => s.id))
const journeyPoints = journeyChain.map((s) => ({ x: (s.x / 100) * WORLD_WIDTH, y: (s.y / 100) * WORLD_HEIGHT }))

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

/** The explorable world: a large pannable star-map the user drags around to find memories. */
export default function World() {
  const worldRef = useRef<HTMLDivElement>(null)
  const [activeStar, setActiveStar] = useState<WorldStarData | null>(null)
  const [visited, setVisited] = useState<Set<string>>(new Set())
  const [showHint, setShowHint] = useState(false)
  const [arrived, setArrived] = useState(false)
  const [guideId, setGuideId] = useState(guideStar.id)

  const pos = useRef({
    x: window.innerWidth / 2 - (guideStar.x / 100) * WORLD_WIDTH,
    y: window.innerHeight / 2 - (guideStar.y / 100) * WORLD_HEIGHT,
  })
  const constraints = useRef({ left: 0, right: 0, top: 0, bottom: 0 })
  const dragState = useRef<{ active: boolean; pointerX: number; pointerY: number; startX: number; startY: number } | null>(
    null,
  )
  const panAnim = useRef<number | null>(null)

  function applyTransform() {
    if (worldRef.current) {
      worldRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
    }
  }

  function cancelPan() {
    if (panAnim.current !== null) {
      cancelAnimationFrame(panAnim.current)
      panAnim.current = null
    }
  }

  function panTo(targetX: number, targetY: number, duration = 1300) {
    cancelPan()
    const startX = pos.current.x
    const startY = pos.current.y
    const startTime = performance.now()
    function step(now: number) {
      const t = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      pos.current = { x: startX + (targetX - startX) * eased, y: startY + (targetY - startY) * eased }
      applyTransform()
      panAnim.current = t < 1 ? requestAnimationFrame(step) : null
    }
    panAnim.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    function updateConstraints() {
      const vw = window.innerWidth
      const vh = window.innerHeight
      constraints.current = {
        left: Math.min(0, vw - WORLD_WIDTH),
        right: 0,
        top: Math.min(0, vh - WORLD_HEIGHT),
        bottom: 0,
      }
      pos.current = {
        x: clamp(pos.current.x, constraints.current.left, constraints.current.right),
        y: clamp(pos.current.y, constraints.current.top, constraints.current.bottom),
      }
      applyTransform()
    }
    updateConstraints()
    window.addEventListener("resize", updateConstraints)
    return () => window.removeEventListener("resize", updateConstraints)
  }, [])

  let visitedCount = journeyChain.findIndex((s) => !visited.has(s.id))
  if (visitedCount === -1) visitedCount = journeyChain.length
  const journeyDone = visitedCount >= journeyChain.length

  useEffect(() => {
    if (!arrived) return
    setShowHint(true)
    const id = setTimeout(() => setShowHint(false), 6000)
    return () => clearTimeout(id)
  }, [arrived, guideId, journeyDone])

  function openStar(star: WorldStarData) {
    setActiveStar(star)
    setVisited((prev) => new Set(prev).add(star.id))
    setShowHint(false)
  }

  function closeStar() {
    const next = activeStar?.next
    setActiveStar(null)
    if (!next) return
    const target = worldStars.find((s) => s.id === next)
    if (!target) return
    setGuideId(next)
    const targetX = clamp(
      window.innerWidth / 2 - (target.x / 100) * WORLD_WIDTH,
      constraints.current.left,
      constraints.current.right,
    )
    const targetY = clamp(
      window.innerHeight / 2 - (target.y / 100) * WORLD_HEIGHT,
      constraints.current.top,
      constraints.current.bottom,
    )
    panTo(targetX, targetY)
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button")) return
    cancelPan()
    dragState.current = {
      active: true,
      pointerX: e.clientX,
      pointerY: e.clientY,
      startX: pos.current.x,
      startY: pos.current.y,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
    setShowHint(false)
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragState.current
    if (!drag?.active) return
    const dx = e.clientX - drag.pointerX
    const dy = e.clientY - drag.pointerY
    pos.current = {
      x: clamp(drag.startX + dx, constraints.current.left, constraints.current.right),
      y: clamp(drag.startY + dy, constraints.current.top, constraints.current.bottom),
    }
    applyTransform()
  }

  function handlePointerUp() {
    if (dragState.current) dragState.current.active = false
  }

  return (
    <div
      className="relative h-screen w-screen touch-none overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        ref={worldRef}
        className="absolute top-0 left-0"
        style={{
          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,
          transform: `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`,
        }}
      >
        <JourneyPath points={journeyPoints} visitedCount={visitedCount} width={WORLD_WIDTH} height={WORLD_HEIGHT} />

        {worldStars.map((star) => {
          const visible = journeyIds.has(star.id) ? visited.has(star.id) || star.id === guideId : journeyDone
          return (
            <WorldStar
              key={star.id}
              star={star}
              visited={visited.has(star.id)}
              revealed={visible}
              guiding={star.id === guideId}
              onOpen={() => openStar(star)}
            />
          )
        })}
      </div>

      <div className="pointer-events-none fixed top-4 right-4 z-20 sm:top-6 sm:right-6">
        <DaysTogetherCounter variant="compact" />
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none fixed bottom-10 left-1/2 z-20 max-w-[85vw] -translate-x-1/2 text-center font-sans text-xs tracking-widest text-ink-dim uppercase sm:bottom-12 sm:text-sm"
          >
            {journeyDone ? "the rest of the sky is yours now" : "that light is waiting for you"}
          </motion.p>
        )}
      </AnimatePresence>

      <StarDetail star={activeStar} onClose={closeStar} />

      {!arrived && <Arrival lines={site.arrivalLines} onDone={() => setArrived(true)} />}
    </div>
  )
}
