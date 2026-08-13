import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface ArrivalProps {
  lines: string[]
  onDone: () => void
}

const LINE_MS = 2200

/** A short cinematic beat between unlocking and the world opening — a few lines, then a fade into the sky. */
export default function Arrival({ lines, onDone }: ArrivalProps) {
  const [index, setIndex] = useState(0)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (index >= lines.length) {
      setClosing(true)
      const id = setTimeout(onDone, 1100)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => setIndex((i) => i + 1), LINE_MS)
    return () => clearTimeout(id)
  }, [index, lines.length, onDone])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: closing ? 0 : 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-ground px-6"
    >
      <AnimatePresence mode="wait">
        {!closing && index < lines.length && (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg text-center font-serif text-2xl text-ink italic sm:text-4xl"
          >
            {lines[index]}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
