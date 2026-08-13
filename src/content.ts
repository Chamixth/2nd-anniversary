// content.ts — EDIT THIS FILE to personalize the site.
// Nothing in src/components or src/sections needs to change once this is filled in.
// Photos referenced here should be placed in /public/photos/ and referenced as "/photos/filename.jpg".

/** The password required to unlock the site is set via VITE_SITE_PASSWORD — see .env.example. */

/** ISO date string of the day you got together. Drives the live "days together" counter. */
export const relationshipStartDate = "2024-08-14T00:00:00"

export const site = {
  /** Her name — shown throughout the site. */
  partnerName: "Chamika",
  /** Your name — shown in the sign-off. */
  yourName: "Chamith",
  /** Displayed on the lock screen and letter star. */
  anniversaryDate: "August 14",
  /** Optional — shown on the lock screen if the password isn't obvious. Leave blank to omit. */
  passwordHint: "the one you listened to before I asked you out",
  /** Shown one at a time, right after unlock, before the world opens. Keep it short — 3-4 lines reads best. */
  arrivalLines: ["for two years now, it's been you.", "i built you a small universe to wander in.", "follow the light."],
}

export interface WorldStar {
  id: string
  /** 0-100, percentage across the world width */
  x: number
  /** 0-100, percentage down the world height */
  y: number
  size: "sm" | "md" | "lg"
  kind: "milestone" | "reason" | "fandom" | "letter"
  /** The world opens with the camera framed on this star, gently pulsing until she clicks it — exactly one star should have this set. */
  guide?: boolean
  /** When she closes this star's detail panel, the camera glides to the star with this id and it becomes the next pulsing "find me" light. */
  next?: string
  /** Short label shown on hover and as the detail panel title */
  label: string
  /** Shown for milestone stars */
  date?: string
  /** If set, `body` (must be a single string) renders inside a stylized chat mockup for that platform instead of plain text */
  platform?: "instagram"
  /** Optional small "her pick / his pick"-style detail chips shown below the body — e.g. favorite characters. */
  notes?: { label: string; value: string; symbol?: "snake" | "phoenix" | "bolt" | "wand" }[]
  /** Optional illustrated banner shown at the top of the detail panel. "photo" renders `bannerPhoto` full-bleed instead of an illustration. */
  scene?: "hogwarts" | "photo"
  /** Used when scene is "photo" — a full-bleed image at the top of the card, e.g. "/photos/whatever.jpg" */
  bannerPhoto?: string
  /** A short standout line — e.g. a favorite quote from a shared movie — shown as a pulled quote below the body. */
  quote?: string
  /** Single paragraph for most stars; an array of paragraphs for the letter star */
  body: string | string[]
  /** Optional path under /public, e.g. "/photos/first-date.jpg" */
  photo?: string
}

/**
 * Everything scattered across the explorable world. Spread these out loosely by x/y —
 * they should read like a real (if sparse) sky, not a grid. Add or remove freely;
 * World.tsx just maps over this array.
 */
export const worldStars: WorldStar[] = [
  // --- milestones, spread across the upper-left of the sky ---
  {
    id: "first-message",
    x: 14,
    y: 20,
    size: "md",
    kind: "milestone",
    guide: true,
    next: "fandom-harry-potter",
    label: "First Message",
    date: "TODO",
    platform: "instagram",
    body: "Hi Chamika, mama Chamith... Aroshage yaluwa.",
  },
  {
    id: "first-date",
    x: 28,
    y: 38,
    size: "md",
    kind: "milestone",
    next: "milestone-3",
    label: "First Date",
    date: "TODO",
    body: "TODO — where you went, what you remember most about that day.",
    photo: "/photos/first-date.jpg",
    quote: "You looked down at the flowers so I wouldn't see you smile first. I saw anyway.",
  },
  {
    id: "milestone-3",
    x: 10,
    y: 58,
    size: "sm",
    kind: "milestone",
    next: "milestone-4",
    label: "Book Fair",
    date: "2024",
    body: "TODO — what happened at the book fair, why it stuck with you.",
    photo: "/photos/book-fair.png",
    quote: "We went for the books. We stayed for each other.",
  },
  {
    id: "milestone-4",
    x: 22,
    y: 75,
    size: "sm",
    kind: "milestone",
    next: "milestone-5",
    label: "Graduation",
    date: "TODO",
    body: "The medal, the flowers, her whole family standing around her — and I got to be one of the people standing there too. That's the part I keep coming back to.",
    photo: "/photos/graduation.jpg",
    quote: "All that work, and the thing she reached for first was still my hand.",
  },
  {
    id: "milestone-5",
    x: 5,
    y: 80,
    size: "sm",
    kind: "milestone",
    next: "milestone-6",
    label: "Madu Ganga",
    date: "TODO",
    body: "TODO — the boat through the mangroves, what happened that day, why it stuck.",
    photo: "/photos/ahangama.jpg",
    quote: "We went looking for mangroves and found a favorite memory instead.",
  },
  {
    id: "milestone-6",
    x: 42,
    y: 15,
    size: "sm",
    kind: "milestone",
    next: "milestone-7",
    label: "Odyssey",
    date: "TODO",
    body: "TODO — which movie, what happened, why the theater run stuck with you.",
    photo: "/photos/odyssey.jpeg",
    quote: "Best seat in the house wasn't on the screen.",
  },
  {
    id: "milestone-7",
    x: 90,
    y: 48,
    size: "sm",
    kind: "milestone",
    next: "milestone-8",
    label: "Birthday",
    date: "TODO",
    body: "TODO — whose birthday, what you did, the cake, the candles, whatever made it a whole thing.",
    photo: "/photos/birthday.jpeg",
    quote: "Another year older, and somehow still the best part of mine.",
  },
  {
    id: "milestone-8",
    x: 95,
    y: 20,
    size: "sm",
    kind: "milestone",
    next: "milestone-9",
    label: "Sunset Walk",
    date: "TODO",
    body: "You walked ahead toward the water while I stayed back with the camera — and somehow that's still one of my favorite photos of us, even though you're barely in it.",
    photo: "/photos/sunset-walk.jpg",
    quote: "Some sunsets you photograph. That one, I just watched.",
  },
  {
    id: "milestone-9",
    x: 28,
    y: 92,
    size: "sm",
    kind: "milestone",
    label: "Keep Moving",
    date: "TODO",
    body: "This one already had a caption — yours. Some things don't need rewriting.",
    photo: "/photos/keep-moving.jpg",
    quote: "Keep moving...!",
  },

  // --- reasons, scattered through the right side of the sky ---
  {
    id: "reason-1",
    x: 68,
    y: 16,
    size: "sm",
    kind: "reason",
    label: "TODO",
    body: "TODO — a reason you love her, short and specific.",
  },
  {
    id: "reason-2",
    x: 82,
    y: 32,
    size: "sm",
    kind: "reason",
    label: "TODO",
    body: "TODO — another reason.",
  },
  {
    id: "reason-3",
    x: 62,
    y: 55,
    size: "sm",
    kind: "reason",
    label: "TODO",
    body: "TODO — another reason.",
  },
  {
    id: "reason-4",
    x: 88,
    y: 68,
    size: "sm",
    kind: "reason",
    label: "TODO",
    body: "TODO — another reason.",
  },
  {
    id: "reason-5",
    x: 72,
    y: 85,
    size: "sm",
    kind: "reason",
    label: "TODO",
    body: "TODO — another reason.",
  },

  // --- fandoms, the shows/movies you've talked about or watched together — loose cluster along the bottom ---
  {
    id: "fandom-harry-potter",
    x: 8,
    y: 90,
    size: "sm",
    kind: "fandom",
    next: "fandom-ok-kanmani",
    scene: "hogwarts",
    label: "Harry Potter",
    body: "TODO — right after that first message, Harry Potter came up. What you two actually said — the theory, the argument, whatever it was.",
    notes: [
      { label: "her favorite", value: "Severus Snape", symbol: "snake" },
      { label: "his favorite", value: "Albus Dumbledore", symbol: "phoenix" },
    ],
  },
  {
    id: "fandom-ok-kanmani",
    x: 58,
    y: 90,
    size: "sm",
    kind: "fandom",
    next: "first-date",
    scene: "photo",
    bannerPhoto: "/photos/ok-kanmani-art.png",
    label: "O Kadhal Kanmani",
    body: "There are two love stories in OK Kanmani — the loud, restless one everyone remembers, and the quiet one underneath it. Ganapathy and Bhavani, decades in, still choosing each other every single morning. That's the one that stayed with us.",
    quote: "She still says his name with love, every next morning — and that's what makes it worth it.",
  },

  // --- the letter, the biggest star, roughly central-bottom ---
  {
    id: "the-letter",
    x: 48,
    y: 52,
    size: "lg",
    kind: "letter",
    label: "One More Thing",
    body: [
      "TODO — opening line of the letter.",
      "TODO — the middle of it, whatever you actually want to say.",
      "TODO — the closing line, and how you sign off.",
    ],
  },
]
