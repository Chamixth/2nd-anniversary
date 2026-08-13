import { AnimatePresence, motion } from "framer-motion"
import { site, type WorldStar } from "../content"
import { displayBody, displayDate, displayLabel, isTodo } from "../lib/placeholder"
import { assetUrl } from "../lib/assetUrl"
import StarIcon from "./StarIcon"
import InstagramDM from "./InstagramDM"
import FandomNotes from "./FandomNotes"
import HogwartsScene from "./HogwartsScene"

const ACCENT: Record<WorldStar["kind"], string> = {
  letter: "linear-gradient(90deg, transparent, var(--color-clay), transparent)",
  fandom: "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
  reason: "linear-gradient(90deg, transparent, var(--color-rose), transparent)",
  milestone: "linear-gradient(90deg, transparent, var(--color-ink-dim), transparent)",
}

const ICON_COLOR: Record<WorldStar["kind"], string> = {
  letter: "var(--color-clay)",
  fandom: "var(--color-gold)",
  reason: "var(--color-rose)",
  milestone: "var(--color-ink-dim)",
}

interface StarDetailProps {
  star: WorldStar | null
  onClose: () => void
}

/** Centered modal panel showing a star's content — a memory, a reason, or the letter. */
export default function StarDetail({ star, onClose }: StarDetailProps) {
  const body = star ? displayBody(star) : []
  const paragraphs = Array.isArray(body) ? body : [body]
  const isLetter = star?.kind === "letter"
  const label = star ? displayLabel(star) : ""
  const date = star ? displayDate(star.date) : undefined

  return (
    <AnimatePresence>
      {star && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-30 flex items-center justify-center overflow-y-auto bg-ground/85 px-4 py-8 sm:px-6 sm:py-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto max-h-[90vh] w-full max-w-2xl overflow-x-hidden overflow-y-auto border border-hairline bg-ground-raised shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]"
          >
            <button
              onClick={onClose}
              aria-label="close"
              className="absolute top-4 right-4 z-10 font-sans text-xs tracking-widest text-ink-faint uppercase transition-colors duration-300 hover:text-ink sm:top-5 sm:right-5 sm:text-sm"
            >
              close
            </button>

            {star.scene === "hogwarts" ? (
              <HogwartsScene />
            ) : star.scene === "photo" && star.bannerPhoto ? (
              <img src={assetUrl(star.bannerPhoto)} alt="" className="block max-h-72 w-full object-cover" />
            ) : (
              <div className="h-[4px] w-full" style={{ background: ACCENT[star.kind] }} />
            )}

            <div className="p-6 sm:p-10 md:p-12">
              <StarIcon
                id={star.id}
                kind={star.kind}
                className="mb-4 h-8 w-8 sm:mb-5 sm:h-10 sm:w-10"
                size={40}
                style={{ color: ICON_COLOR[star.kind] }}
              />

              {date && <p className="mb-2 font-sans text-xs tracking-widest text-clay uppercase sm:mb-3 sm:text-sm">{date}</p>}
              {star.kind === "fandom" && !date && (
                <p className="mb-2 font-serif text-sm text-ink-faint italic sm:mb-3 sm:text-base">ours</p>
              )}
              <h3 className="mb-4 font-serif text-2xl text-ink sm:mb-6 sm:text-4xl">{label}</h3>
              {star.platform === "instagram" && typeof body === "string" ? (
                <InstagramDM from={site.yourName} message={body} time={date} />
              ) : (
                <div className="flex flex-col gap-4 sm:gap-5">
                  {paragraphs.map((p, i) =>
                    isLetter ? (
                      <p key={i} className="font-serif text-lg leading-relaxed text-ink italic sm:text-2xl">
                        {p}
                      </p>
                    ) : (
                      <p key={i} className="font-sans text-sm leading-relaxed text-ink-dim sm:text-base">
                        {p}
                      </p>
                    ),
                  )}
                </div>
              )}
              {star.quote && !isTodo(star.quote) && (
                <blockquote className="mt-6 border-t border-hairline pt-5 sm:mt-8 sm:pt-6">
                  <p className="font-serif text-lg leading-snug text-ink italic sm:text-2xl">"{star.quote}"</p>
                </blockquote>
              )}
              {star.notes && <FandomNotes notes={star.notes} />}
              {star.photo && (
                <img src={assetUrl(star.photo)} alt={label} className="mt-6 w-full border border-hairline sm:mt-8" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
