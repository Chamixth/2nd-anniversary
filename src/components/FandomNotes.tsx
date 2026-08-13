import type { WorldStar } from "../content"

type Note = NonNullable<WorldStar["notes"]>[number]

const SYMBOL_PATHS: Record<NonNullable<Note["symbol"]>, string> = {
  snake: "M4 6c4 0 3 4 7 4s3-4 7-4M4 12c4 0 3 4 7 4s3-4 7-4M4 18c2 0 2 2 4 2",
  phoenix: "M12 3c2 3 1 5-1 6 3-1 6 1 6 5-2-2-4-2-5-1 2 1 3 3 2 6-2-3-4-4-6-3 1-3 0-5-2-6 3 0 4-2 3-4 1 2 3 2 3-3Z",
  bolt: "M14 2 5 14h5l-2 8 10-13h-5l1-7Z",
  wand: "M4 20 18 6M15 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1Z",
}

/** "her pick / his pick" read as a soft aside, not a UI chip — a small mark plus a hand-written-feeling line. */
export default function FandomNotes({ notes }: { notes: Note[] }) {
  return (
    <div className="mt-8 flex flex-col gap-4 border-l border-hairline pl-5">
      {notes.map((note) => (
        <div key={note.label} className="flex items-baseline gap-3">
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 translate-y-0.5"
          >
            <path d={SYMBOL_PATHS[note.symbol ?? "bolt"]} />
          </svg>
          <p className="font-serif text-base text-ink-dim italic">
            {note.label} — <span className="text-ink not-italic">{note.value}</span>
          </p>
        </div>
      ))}
    </div>
  )
}
