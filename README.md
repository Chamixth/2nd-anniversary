# anniversary

A private site gated behind a password: once unlocked, she lands in an explorable star-map she can drag around — scattered across it are stars for memories, reasons, and a closing letter, found by wandering rather than scrolling.

## Personalizing it

Everything you need to edit lives in **`src/content.ts`** — names, the anniversary date, the relationship start date (drives the live counter), and `worldStars`, a single array of every star in the sky. Each entry has an `x`/`y` position (0-100, percentage across the world), a `size`, a `kind` (`"milestone"`, `"reason"`, `"fandom"`, or `"letter"` — there should be exactly one `"letter"` star), a label, and a body (a paragraph, or an array of paragraphs for the letter). Every placeholder is marked `// TODO`. You don't need to touch any component or section file — just add, remove, or reposition entries in `worldStars`.

`"fandom"` stars (gold-tinted, bottom of the sky) are for the shows and movies you've talked about together — Harry Potter, Game of Thrones, Nolan/Batman, Vikings, foreign films, Hindi movies are seeded as placeholders. Fill in the specific memory or inside joke for each, rename/remove any that don't apply, and add more the same way.

Photos go in `public/photos/` and get referenced from `content.ts` as `/photos/filename.jpg`.

## Setting the password

The unlock password is read from the `VITE_SITE_PASSWORD` environment variable.

- Locally: edit `.env.local` (already gitignored, won't be committed).
- In production (Vercel): set `VITE_SITE_PASSWORD` under Project Settings → Environment Variables.

If it's unset, the site falls back to `changeme` and logs a console warning — don't ship the link without setting a real one.

By default the unlock persists only for the current browser session (`sessionStorage`) — closing the tab re-locks it. To make it stay unlocked permanently on her device instead, change `sessionStorage` to `localStorage` in `src/hooks/usePasswordGate.ts`.

## Running it

```
npm install
npm run dev
```

## Deploying

Push to a GitHub repo and import it into [Vercel](https://vercel.com) — it auto-detects the Vite build (`vite build` → `dist/`), zero config needed. Set `VITE_SITE_PASSWORD` in the project's environment variables before sharing the link. Netlify works the same way (build command `npm run build`, publish directory `dist`).
