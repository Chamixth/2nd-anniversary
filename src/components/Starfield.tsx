import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  radius: number
  baseAlpha: number
  twinkleSpeed: number
  twinklePhase: number
  driftSpeed: number
}

const STAR_COLOR = "242, 237, 230"
const STAR_COUNT_PER_PX = 1 / 3600 // ~1 star per 60x60px

function createStars(width: number, height: number): Star[] {
  const count = Math.round(width * height * STAR_COUNT_PER_PX)
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.1 + 0.3,
    baseAlpha: Math.random() * 0.5 + 0.25,
    twinkleSpeed: Math.random() * 0.6 + 0.2,
    twinklePhase: Math.random() * Math.PI * 2,
    driftSpeed: Math.random() * 4 + 2,
  }))
}

/**
 * Fixed full-viewport canvas starfield. Renders once per mount and animates
 * via requestAnimationFrame — deliberately plain canvas rather than WebGL,
 * since a few hundred drifting/twinkling points don't need a 3D pipeline.
 */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let stars: Star[] = []
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx?.scale(dpr, dpr)
      stars = createStars(width, height)
    }

    function handlePointerMove(e: PointerEvent) {
      pointerRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointerRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", handlePointerMove)

    let animationId: number
    const start = performance.now()

    function render(now: number) {
      if (!ctx) return
      const t = (now - start) / 1000
      ctx.clearRect(0, 0, width, height)

      const parallaxX = pointerRef.current.x * 6
      const parallaxY = pointerRef.current.y * 6

      for (const star of stars) {
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5
        const alpha = star.baseAlpha * (0.5 + twinkle * 0.5)
        const driftX = star.x + parallaxX + Math.sin(t * 0.05 + star.twinklePhase) * star.driftSpeed
        const driftY = star.y + parallaxY

        ctx.beginPath()
        ctx.arc(driftX, driftY, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${STAR_COLOR}, ${alpha})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(render)
    }

    animationId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointerMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
