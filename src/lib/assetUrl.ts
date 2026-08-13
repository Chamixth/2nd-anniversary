/** Resolves a root-relative public asset path (e.g. "/photos/x.jpg") against the deployed base path — needed because GitHub Pages serves this site from a subpath, not the domain root. */
export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`
}
