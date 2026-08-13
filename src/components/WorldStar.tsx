import type { WorldStar as WorldStarData } from "../content"
import { displayLabel } from "../lib/placeholder"

interface WorldStarProps {
  star: WorldStarData
  visited: boolean
  revealed: boolean
  guiding: boolean
  onOpen: () => void
}

const SIZE_MAP: Record<WorldStarData["size"], { dot: number; glow: number }> = {
  sm: { dot: 9, glow: 15 },
  md: { dot: 13, glow: 22 },
  lg: { dot: 21, glow: 38 },
}

function hashDelay(id: string) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 1000
  return h / 1000
}

/** A single glowing, clickable star in the explorable world — a small floating tag names it, brightening on hover/tap. */
export default function WorldStar({ star, visited, revealed, guiding, onOpen }: WorldStarProps) {
  const { dot, glow } = SIZE_MAP[star.size]
  const isGuiding = guiding && !visited
  const delay = hashDelay(star.id)
  const label = displayLabel(star)
  const COLORS: Record<WorldStarData["kind"], { color: string; glow: string }> = {
    letter: { color: "var(--color-clay)", glow: "rgba(217,119,87,0.45)" },
    fandom: { color: "var(--color-gold)", glow: "rgba(201,166,85,0.4)" },
    reason: { color: "var(--color-rose)", glow: "rgba(224,141,148,0.4)" },
    milestone: { color: "var(--color-ink)", glow: "rgba(242,237,230,0.3)" },
  }
  const { color, glow: glowColor } = COLORS[star.kind]
  const shown = revealed

  return (
    <button
      onClick={onOpen}
      className="group absolute -translate-x-1/2 -translate-y-1/2 p-3"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        pointerEvents: shown ? "auto" : "none",
      }}
      aria-label={label}
    >
      <span
        className="relative block transition-opacity ease-out"
        style={{
          width: dot,
          height: dot,
          opacity: shown ? 1 : 0,
          transitionDuration: "1200ms",
          transitionDelay: `${0.1 + delay * 1.1}s`,
        }}
      >
        {isGuiding && (
          <>
            <span
              className="absolute inset-0 rounded-full"
              style={{ border: `1px solid ${color}`, animation: "pulse-ring 2.4s ease-out infinite" }}
            />
            <span
              className="absolute inset-0 rounded-full"
              style={{ border: `1px solid ${color}`, animation: "pulse-ring 2.4s ease-out 1.2s infinite" }}
            />
          </>
        )}
        <span
          className="absolute inset-0 block rounded-full transition-opacity duration-300"
          style={{
            background: color,
            boxShadow: `0 0 ${glow * (isGuiding ? 1.6 : 1)}px ${glow / 2}px ${glowColor}`,
            opacity: visited ? 0.5 : 1,
            animation: `twinkle ${3 + delay * 2}s ease-in-out ${delay * 3}s infinite`,
          }}
        />
      </span>
      <span
        className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 border border-hairline bg-ground-raised px-2.5 py-1 font-sans text-xs whitespace-nowrap text-ink-dim shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:border-hairline-strong group-hover:text-ink sm:text-sm"
        style={{
          opacity: shown ? 0.92 : 0,
          transitionDelay: `${0.1 + delay * 1.1}s`,
        }}
      >
        {label}
      </span>
    </button>
  )
}
