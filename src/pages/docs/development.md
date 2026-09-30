---
layout: ../../layouts/Docs.astro
title: Development
description: Set up the repositories, run the checks, and cut a release.
---

## Repositories

| Repository                                                                    | What is in it                                                                                                                                            |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Abadima/RPC](https://github.com/Abadima/RPC)                                 | The browser extension (`browser/`, Bun and TypeScript), Parousia Desktop (`desktop/`, Rust), the design documents (`project/`), and the release workflow |
| [parousia-project/activities](https://github.com/parousia-project/activities) | Native Activities, their format, and their tooling                                                                                                       |
| [parousia-project/website](https://github.com/parousia-project/website)       | This site (Astro and Svelte)                                                                                                                             |

The design lives in the Parousia repository: `project/architecture.md` for how the pieces fit, `project/threat-model.md` for security, and `project/roadmap.md` for what is done and what is next.

## Set up

You need [Bun](https://bun.sh) 1.4 and a stable Rust toolchain. Then, in the Parousia repository:

```sh
cd browser
bun install
bun run typecheck && bun run lint && bun run format:check
bun run activities:fetch   # PreMiD's and Parousia's Activities, at the commits it pins
bun run build              # dist/chromium, dist/firefox, dist/userscript
bun test

cd ../desktop
cargo build && cargo test
cargo clippy --all-targets -- -D warnings && cargo fmt --check
```

`bun run dev` rebuilds on change and gives the Chromium build a stable extension id per machine, so you allow it in Desktop once.

## End to end

With Desktop built and port 57179 free, on Linux:

```sh
bun run chromium:setup     # once: an isolated Chromium for automation
bun run desktop:verify     # extension and Desktop, refused then allowed, userscripts, hostile input
bun run activities:verify  # real PreMiD and native Activities, degrading without access, the dashboard
bun run real:verify        # the same against installed Firefox and Chromium, and Violentmonkey
```

`discord:verify` shows a real Activity in a real Discord and is opt-in. `bun run bench` measures sizes, memory, CPU, and latency.

## Releasing

A release is a version tag on `main`. Set the version in `desktop/Cargo.toml` and both extension manifests, merge, then push `vX.Y.Z`. The release workflow tests and builds everything, then publishes:

| File                                                                          | What it is                                          |
| ----------------------------------------------------------------------------- | --------------------------------------------------- |
| `parousia-desktop-windows-x86_64.exe`, `parousia-desktop-windows-aarch64.exe` | Desktop for Windows, standalone                     |
| `parousia-desktop-linux-x86_64`, `parousia-desktop-linux-aarch64`             | Desktop for Linux, static                           |
| `parousia-chromium.zip`, `parousia-firefox.zip`                               | The extension                                       |
| `parousia.user.js`, `parousia.user.js.gz`                                     | The userscript, minified, and the same file gzipped |
| `SHA256SUMS`                                                                  | Checksums of all of the above                       |

Running the workflow by hand does everything except publish. The Parousia repository's `CONTRIBUTING.md` has the steps.

## This site

```sh
bun install
bun run dev
bun run typecheck && bun run lint && bun run format:check && bun test
bun run build
```

Pushes to `main` deploy to GitHub Pages. Where the site links to a release file, the name is in `src/site.ts`.
