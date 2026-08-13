import { useEffect, useState } from "react"
import { getElapsed, type Elapsed } from "../lib/time"
import { relationshipStartDate } from "../content"

/** Live-ticking breakdown of time elapsed since `relationshipStartDate`. */
export function useDaysTogether(): Elapsed {
  const [elapsed, setElapsed] = useState<Elapsed>(() => getElapsed(relationshipStartDate))

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(getElapsed(relationshipStartDate))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return elapsed
}
