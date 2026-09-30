---
layout: ../../layouts/Docs.astro
title: Activities
description: How Parousia detects sites, how PreMiD's Activities run, and how to write your own in TypeScript.
---

An Activity teaches Parousia to recognize a site and describe what you are doing there, like "Playing Chess" on Jena Hub. Parousia has two sources, and both go through the same pipeline.

## Where they come from

- **Native Activities** are TypeScript, in [parousia-project/activities](https://github.com/parousia-project/activities). Each is a folder, `websites/<letter>/<Name>/`, filed like PreMiD's.
- **PreMiD's Activities** run unchanged on Parousia's own implementation of PreMiD's `Presence` API. That is 1,410 of the 1,417 at the commit Parousia pins. The rest need their own npm packages, target PreMiD's API version 2, or are on PreMiD's DMCA list.

The extension is built with both sets included, each pinned to a commit, and nothing is downloaded while it runs. A site both sources cover is listed once; the native Activity runs until you pick PreMiD's on the Activity's page.

## What a native Activity can do

It is handed the page's URL and title and returns what to show. It does not run in the page, so it cannot read it, and it makes no requests and keeps no state. That is why a native Activity needs no extra browser permission.

One that shows what is playing can declare page data in its metadata, and gets only that: `media` (the Media Session and the playing `<video>` or `<audio>`) and `thumbnails` (the largest artwork, or the page's `og:image`). Parousia's own collector reads these, and only for sites you granted and kinds you left on. Such an Activity is off until you turn it on, and it must still work from the URL and title alone.

## Writing one

```text
websites/E/Example/
  metadata.json      name, description, version, authors, matches, settings
  activity.ts        export default { detect }
  activity.test.ts   its tests
```

`metadata.json` names the pages it is for with [match patterns](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Match_patterns), such as `https://example.com/*`, and can add options people can change (boolean, choice, text, or number). `detect(page, settings)` returns an Activity (name, two lines of text, links, images, timestamps, up to two buttons) or `null` for nothing. The rules every Activity follows, briefly:

- Build presence only from the URL, the title, and the page data you declared.
- Rebuild links from the parts you need, and never copy a query string or fragment unless it names what is shown.
- Strip control and direction-override characters and cap the length before a title becomes text.
- No `eval`, `new Function`, or dynamic `import()`; image URLs are `https`.

The [Activities repository's guide](https://github.com/parousia-project/activities/blob/main/.github/CONTRIBUTING.md) is the full reference: the format, the API, the rules, and testing.

## Tooling

In the Activities repository:

- `bun run check` runs the type checker, lint, format check, a validator for every folder and its metadata, and the tests. CI runs the same.
- `schemas/metadata.json` gives editors a schema for `metadata.json`.
- `tools/testing.ts` has `page()` to build a page, `matches()` to ask whether Parousia would run the Activity there, `defaults()` for a settings object, and `checkActivity()`, which lists anything Discord would refuse or cut.

To try an Activity in a real extension, point the build at your checkout and load the result:

```sh
cd browser
PAROUSIA_ACTIVITIES_DIR=/path/to/activities bun run build
```

Then load `dist/chromium` or `dist/firefox` as an unpacked extension. The build checks every Activity again, including its types against Parousia's copy of the API, and stops on a problem.

In the Parousia repository, `bun run activities:check` checks both sources and lists the PreMiD Activities it leaves out, with reasons.
