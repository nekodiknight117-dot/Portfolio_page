/**
 * Resolve a path inside `public/` against Vite's configured base URL, so the
 * site still works when deployed under a sub-path (e.g. GitHub Pages).
 *
 * `publicUrl('/resume.pdf')` -> `/resume.pdf` (base "/") or `/repo/resume.pdf` (base "/repo/").
 */
export function publicUrl(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}/${path.replace(/^\//, '')}`
}
