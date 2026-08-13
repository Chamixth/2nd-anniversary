import { useDaysTogether } from "../hooks/useDaysTogether"

interface DaysTogetherCounterProps {
  variant?: "compact" | "expanded"
}

function pad(n: number) {
  return n.toString().padStart(2, "0")
}

export default function DaysTogetherCounter({ variant = "compact" }: DaysTogetherCounterProps) {
  const elapsed = useDaysTogether()

  if (variant === "compact") {
    return (
      <p className="font-sans text-xs tracking-widest text-ink-dim uppercase sm:text-sm">
        {elapsed.totalDays.toLocaleString()} days together
      </p>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-sans">
      {[
        { label: "years", value: elapsed.years },
        { label: "months", value: elapsed.months },
        { label: "days", value: elapsed.days },
        { label: "hours", value: pad(elapsed.hours) },
        { label: "minutes", value: pad(elapsed.minutes) },
        { label: "seconds", value: pad(elapsed.seconds) },
      ].map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="font-serif text-3xl text-ink sm:text-4xl">{unit.value}</div>
          <div className="mt-1 text-xs tracking-widest text-ink-faint uppercase">{unit.label}</div>
        </div>
      ))}
    </div>
  )
}
