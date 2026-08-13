import { useCallback, useState } from "react"

const STORAGE_KEY = "anniv_unlocked"
const FALLBACK_PASSWORD = "changeme"

function getExpectedPassword(): string {
  const configured = import.meta.env.VITE_SITE_PASSWORD as string | undefined
  if (!configured) {
    console.warn(
      "[anniversary] VITE_SITE_PASSWORD is not set — falling back to a placeholder password. " +
        "Set it in .env.local before sharing this link.",
    )
    return FALLBACK_PASSWORD
  }
  return configured
}

export function usePasswordGate() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === "true",
  )

  const attempt = useCallback((input: string) => {
    const expected = getExpectedPassword()
    const correct = input.trim().toLowerCase() === expected.trim().toLowerCase()
    if (correct) {
      sessionStorage.setItem(STORAGE_KEY, "true")
      setUnlocked(true)
    }
    return correct
  }, [])

  return { unlocked, attempt }
}
