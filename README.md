# Parousia website

The source of [parousia.abadima.dev](https://parousia.abadima.dev): the landing page, downloads, and documentation for [Parousia](https://github.com/Abadima/RPC), built with [Astro](https://astro.build) and [Svelte 5](https://svelte.dev). It is a static site with one small interactive piece (the download page suggests the Desktop build for your system).

## Commands

```bash
bun install
bun run dev           # local dev server
bun run build         # static site in dist/
bun run preview       # serve the production build
bun run typecheck     # astro sync && tsc --noEmit
bun run lint
bun run format:check
bun test
```

`astro check` does not support TypeScript 7 yet, so `typecheck` runs `tsc` against the types `astro sync` generates. That covers `.ts` files and `.astro` frontmatter but not `<script>` in `.svelte` files, and test files (`*.test.ts`) are run by `bun test` and left out of `tsc`.

## Layout

| Path            | What it is                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| `src/pages/`    | Pages. `docs/*.md` are the documentation, written in Markdown and wrapped by `src/layouts/Docs.astro` |
| `src/docs.ts`   | The documentation pages in sidebar order                                                              |
| `src/site.ts`   | Repository links and release file names. Change a link or a file name here                            |
| `src/detect.ts` | Picks the Desktop build to suggest, with tests                                                        |
| `public/pwa/`   | The standalone `/pwa/` page: static, installable, cache-first service worker                          |
| `public/CNAME`  | The custom domain, `parousia.abadima.dev`                                                             |

The download links go to `releases/latest/download/<file>` in the Parousia repository. Release file names carry no version, so they stay valid. If a release stops publishing a file, update `src/site.ts` and the tables in `src/pages/docs/development.md`.

## Deploying

Pushes to `main` run `.github/workflows/pages.yml`, which builds with the site URL and base path GitHub Pages reports and deploys the result. In the repository settings, Pages must use "GitHub Actions" as its source and `parousia.abadima.dev` as its custom domain. GitHub ignores `public/CNAME` for Actions deployments, but the file stays so other tools that look for it (js.org's registry check, for one) find it.

`parousia.abadima.dev` also has to be registered with [js.org](https://github.com/js-org/js.org) (a pull request adding it to `cnames_active.js` that points at `parousia-project.github.io`) before it resolves.

## License

[Apache-2.0](LICENSE).
