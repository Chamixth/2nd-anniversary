import { motion } from "framer-motion"
import PasswordGate from "../components/PasswordGate"
import { site } from "../content"

interface LockScreenProps {
  attempt: (input: string) => boolean
}

export default function LockScreen({ attempt }: LockScreenProps) {
  return (
    <motion.div
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-4 font-sans text-sm tracking-[0.3em] text-ink-faint uppercase"
      >
        for {site.partnerName}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15 }}
        className="mb-10 font-serif text-3xl text-ink italic sm:mb-12 sm:text-5xl"
      >
        this one's just for you
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.35 }}
        className="w-full"
      >
        <PasswordGate attempt={attempt} hint={site.passwordHint || undefined} />
      </motion.div>
    </motion.div>
  )
}
