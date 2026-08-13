import type { WorldStar } from "../content"

const LABEL_FALLBACK: Record<WorldStar["kind"], string> = {
  milestone: "a moment, not yet written",
  reason: "a reason, still being written",
  fandom: "something we watched together",
  letter: "one more thing",
}

const BODY_FALLBACK: Record<WorldStar["kind"], string> = {
  milestone: "— this one's still being written.",
  reason: "— still being written.",
  fandom: "— still being written.",
  letter: "— still being written.",
}

export function isTodo(text: string) {
  return text.trim().toUpperCase().startsWith("TODO")
}

/** Never let a raw "TODO — ..." placeholder render as real UI copy — fall back to something that reads as intentional. */
export function displayLabel(star: WorldStar): string {
  return isTodo(star.label) ? LABEL_FALLBACK[star.kind] : star.label
}

export function displayBody(star: WorldStar): string | string[] {
  if (Array.isArray(star.body)) {
    return star.body.map((p) => (isTodo(p) ? BODY_FALLBACK[star.kind] : p))
  }
  return isTodo(star.body) ? BODY_FALLBACK[star.kind] : star.body
}

export function displayDate(date: string | undefined): string | undefined {
  if (!date || isTodo(date)) return undefined
  return date
}
