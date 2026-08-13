interface Point {
  x: number
  y: number
}

interface JourneyPathProps {
  points: Point[]
  visitedCount: number
  width: number
  height: number
}

/** The trail of stardust connecting the stars she's already found, plus a faint thread reaching toward the next one. */
export default function JourneyPath({ points, visitedCount, width, height }: JourneyPathProps) {
  if (points.length < 2) return null

  const traveled = points.slice(0, Math.max(visitedCount, 1))
  const traveledPath = traveled.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
  const nextSegment = visitedCount > 0 && visitedCount < points.length ? [points[visitedCount - 1], points[visitedCount]] : null

  return (
    <svg
      className="pointer-events-none absolute top-0 left-0"
      width={width}
      height={height}
      style={{ overflow: "visible" }}
    >
      {traveled.length > 1 && (
        <path
          d={traveledPath}
          fill="none"
          stroke="var(--color-ink-faint)"
          strokeWidth={1.2}
          strokeDasharray="1 9"
          strokeLinecap="round"
          opacity={0.5}
        />
      )}
      {nextSegment && (
        <line
          x1={nextSegment[0].x}
          y1={nextSegment[0].y}
          x2={nextSegment[1].x}
          y2={nextSegment[1].y}
          stroke="var(--color-gold)"
          strokeWidth={1}
          strokeDasharray="1 7"
          strokeLinecap="round"
          opacity={0.4}
          style={{ animation: "dash-drift 3.5s linear infinite" }}
        />
      )}
    </svg>
  )
}
