# Myfolio Monorepo

Interactive, gamified portfolio scaffolding for Vibhu Dikshit. This monorepo uses pnpm workspaces to host
multiple front-end apps: a SvelteKit core experience, an Astro knowledge hub, a Qwik mini-game, and a
Solid micro-interaction island. Animation and creative tooling (GSAP, Rive, Threlte/Three.js, Lenis,
Tone.js, p5.js) are wired into the stacks.

## Structure
- `apps/site` – SvelteKit core site with UnoCSS and dark-mode hero.
- `apps/astro` – Astro docs/blog space for roadmap content.
- `apps/qwik` – Qwik micro-game placeholder to showcase resumability.
- `apps/solid` – SolidJS interaction island for embedding.
- `content/resume.yaml` – Human-editable resume content loaded by the site.

## Scripts
Use pnpm from the repo root:

```bash
pnpm install
pnpm --filter @myfolio/site dev
pnpm --filter @myfolio/astro dev
pnpm --filter @myfolio/qwik dev
pnpm --filter @myfolio/solid dev
```

## Tooling
- TypeScript, ESLint, Prettier, Husky hooks, and commitlint are preconfigured.
- GitHub Pages workflows (`.github/workflows/*.yml`) build and publish each app on pushes to `main`.

> Note: Package installs are not executed in this environment because npm registry access was forbidden
> (403). Dependencies are declared and ready for installation when connectivity is available.
