import type { CSSProperties, ReactElement } from "react"

interface StarIconProps {
  id: string
  kind: "milestone" | "reason" | "fandom" | "letter"
  size?: number
  className?: string
  style?: CSSProperties
}

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

type IconRenderProps = typeof ICON_PROPS & { width: number; height: number; className?: string; style?: CSSProperties }

/** Small original line-icons — hand-drawn motifs, not brand marks — one per star or per kind fallback. */
const ICONS: Record<string, (props: IconRenderProps) => ReactElement> = {
  "first-message": (p) => (
    <svg {...p}>
      <path d="M4 5.5h16v10H9.5L5 19v-3.5H4v-10Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  ),
  "first-date": (p) => (
    <svg {...p}>
      <circle cx="9.5" cy="12" r="6" />
      <circle cx="14.5" cy="12" r="6" />
    </svg>
  ),
  "fandom-harry-potter": (p) => (
    <svg {...p}>
      <path d="M14 2 5 14h5l-2 8 10-13h-5l1-7Z" />
    </svg>
  ),
  "fandom-got": (p) => (
    <svg {...p}>
      <path d="M4 18 6 8l6-5 6 5 2 10" />
      <path d="M4 18h16" />
      <path d="M9 18v-6M12 18v-8M15 18v-6" />
    </svg>
  ),
  "fandom-nolan": (p) => (
    <svg {...p}>
      <path d="M12 8c-2.2-2.6-5-3.4-8-2.6 1.4 1 2 2 2.4 3.2C4.6 8 3.4 8 2 8.4 3.4 9.6 5 10 6.6 9.8 4.8 11 3.6 12.6 3 14.6c2.4-1 4.2-1 6 .2-.6 1-.8 1.8-.6 3 1.4-.8 2.4-1.6 3-2.8.6 1.2 1.6 2 3 2.8.2-1.2 0-2-.6-3 1.8-1.2 3.6-1.2 6-.2-.6-2-1.8-3.6-3.6-4.8 1.6.2 3.2-.2 4.6-1.4-1.4-.4-2.6-.4-3.8.2.4-1.2 1-2.2 2.4-3.2-3-.8-5.8 0-8 2.6Z" />
    </svg>
  ),
  "fandom-vikings": (p) => (
    <svg {...p}>
      <path d="M3 15c2 3 5 4.5 9 4.5s7-1.5 9-4.5" />
      <path d="M6 15V6c1.5 1 2.5 1 4 0M18 15V6c-1.5 1-2.5 1-4 0" />
      <path d="M12 6V3" />
    </svg>
  ),
  "fandom-ok-kanmani": (p) => (
    <svg {...p}>
      <circle cx="8.5" cy="7" r="2.2" />
      <path d="M4.5 19c0-3.8 1.8-6 4-6s4 2.2 4 6" />
      <circle cx="15.5" cy="7" r="2.2" />
      <path d="M11.5 19c0-3.8 1.8-6 4-6s4 2.2 4 6" />
    </svg>
  ),
  "fandom-hindi-movies": (p) => (
    <svg {...p}>
      <path d="M12 4v11" />
      <circle cx="9.5" cy="17.5" r="2.5" />
      <circle cx="14.5" cy="15.5" r="2.5" />
      <path d="M12 4c2-.5 3-1.5 3.5-3" />
    </svg>
  ),
  "the-letter": (p) => (
    <svg {...p}>
      <rect x="3.5" y="6" width="17" height="13" rx="1.2" />
      <path d="M3.5 7 12 13l8.5-6" />
    </svg>
  ),
}

const KIND_FALLBACK: Record<StarIconProps["kind"], (props: IconRenderProps) => ReactElement> = {
  milestone: (p) => (
    <svg {...p}>
      <path d="M12 2.5 15 9 22 9.8 17 14.3 18.2 21.2 12 17.8 5.8 21.2 7 14.3 2 9.8 9 9Z" />
    </svg>
  ),
  reason: (p) => (
    <svg {...p}>
      <path d="M12 19.5S4 14.8 4 9.2A4.2 4.2 0 0 1 12 6.8a4.2 4.2 0 0 1 8 2.4c0 5.6-8 10.3-8 10.3Z" />
    </svg>
  ),
  fandom: (p) => (
    <svg {...p}>
      <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" opacity={0.6} />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  letter: (p) => (
    <svg {...p}>
      <rect x="3.5" y="6" width="17" height="13" rx="1.2" />
      <path d="M3.5 7 12 13l8.5-6" />
    </svg>
  ),
}

export default function StarIcon({ id, kind, size = 26, className, style }: StarIconProps) {
  const render = ICONS[id] ?? KIND_FALLBACK[kind]
  const props = { ...ICON_PROPS, width: size, height: size, className, style }
  return render(props)
}
