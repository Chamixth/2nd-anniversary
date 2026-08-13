const SKYLINE =
  "M0,160 L0,120 L15,120 L15,104 L25,104 L25,120 L40,120 L40,68 L48,52 L56,68 L56,120 L75,120 L75,98 L85,98 L85,120 L100,120 L100,38 L112,18 L124,38 L124,120 L150,120 L150,94 L160,94 L160,120 L180,120 L180,58 L190,42 L200,58 L200,120 L230,120 L230,100 L240,100 L240,120 L260,120 L260,28 L272,10 L284,28 L284,120 L310,120 L310,94 L320,94 L320,120 L340,120 L340,72 L350,56 L360,72 L360,120 L400,120 L400,160 Z"

const STARS = [
  { x: 24, y: 20, r: 0.8 }, { x: 64, y: 34, r: 0.6 }, { x: 96, y: 16, r: 0.7 },
  { x: 138, y: 28, r: 0.5 }, { x: 168, y: 14, r: 0.8 }, { x: 214, y: 22, r: 0.6 },
  { x: 244, y: 40, r: 0.5 }, { x: 30, y: 46, r: 0.5 }, { x: 300, y: 40, r: 0.6 },
  { x: 380, y: 60, r: 0.6 }, { x: 10, y: 62, r: 0.5 }, { x: 130, y: 50, r: 0.4 },
]

const WINDOWS = [
  { x: 20, y: 112 }, { x: 46, y: 90 }, { x: 46, y: 105 }, { x: 80, y: 112 },
  { x: 112, y: 60 }, { x: 112, y: 80 }, { x: 112, y: 100 }, { x: 155, y: 110 },
  { x: 190, y: 75 }, { x: 190, y: 95 }, { x: 235, y: 112 }, { x: 272, y: 50 },
  { x: 272, y: 75 }, { x: 272, y: 100 }, { x: 315, y: 110 }, { x: 350, y: 88 },
  { x: 350, y: 105 },
]

/** An original night-castle skyline — hand-coded shapes evoking "wizard school at night," not a reproduction of any specific film's silhouette. */
export default function HogwartsScene() {
  return (
    <svg viewBox="0 0 400 160" className="block w-full" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="hp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1830" />
          <stop offset="100%" stopColor="#05070d" />
        </linearGradient>
        <radialGradient id="hp-moon-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(242,237,230,0.5)" />
          <stop offset="100%" stopColor="rgba(242,237,230,0)" />
        </radialGradient>
      </defs>

      <rect width="400" height="160" fill="url(#hp-sky)" />

      {STARS.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="#f2ede6"
          opacity={0.7}
          style={{ animation: `twinkle ${3 + (i % 4)}s ease-in-out ${(i % 5) * 0.6}s infinite` }}
        />
      ))}

      <circle cx="338" cy="32" r="26" fill="url(#hp-moon-glow)" />
      <circle cx="338" cy="32" r="12" fill="#f2ede6" opacity={0.92} />

      <path d={SKYLINE} fill="#05070d" />

      {WINDOWS.map((w, i) => (
        <rect
          key={i}
          x={w.x}
          y={w.y}
          width={3}
          height={4.5}
          fill="var(--color-gold)"
          style={{
            filter: "drop-shadow(0 0 2px var(--color-gold))",
            animation: `twinkle ${2.5 + (i % 3)}s ease-in-out ${(i % 4) * 0.5}s infinite`,
          }}
        />
      ))}
    </svg>
  )
}
