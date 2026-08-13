import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"

interface PasswordGateProps {
  attempt: (input: string) => boolean
  hint?: string
}

export default function PasswordGate({ attempt, hint }: PasswordGateProps) {
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const correct = attempt(value)
    if (!correct) {
      setError(true)
      setValue("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-sm flex-col items-center gap-5">
      <motion.div
        animate={error ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError(false)
          }}
          placeholder="password"
          className="w-full border-b border-hairline bg-transparent px-1 py-3 text-center font-sans text-base tracking-widest text-ink outline-none placeholder:text-ink-faint focus:border-hairline-strong"
        />
      </motion.div>

      {error && (
        <p className="font-sans text-sm tracking-wide text-clay">not quite — try again</p>
      )}

      {hint && !error && (
        <p className="font-sans text-sm tracking-wide text-ink-faint">hint: {hint}</p>
      )}

      <button
        type="submit"
        className="mt-2 border border-hairline px-6 py-3 font-sans text-sm tracking-widest text-ink-dim uppercase transition-colors duration-300 hover:border-hairline-strong hover:text-ink"
      >
        unlock
      </button>
    </form>
  )
}
