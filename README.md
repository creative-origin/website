# Creative Origin Site (Vite + React + Tailwind)

This is a multi-page (hash-routed) marketing site:

## Important (GitHub Pages base path)

`vite.config.ts` now derives the correct GitHub Pages `base` from the `GITHUB_REPOSITORY` environment variable at build time and falls back to `"website"` locally. If you rename your fork, update that fallback string so local builds stay aligned, but you no longer have to edit the file per deployment.

- #/
- #/news
- #/events
- #/partners
