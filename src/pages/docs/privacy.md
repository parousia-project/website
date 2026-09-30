---
layout: ../../layouts/Docs.astro
title: Privacy and security
description: What Parousia reads, what leaves your browser, and what it refuses.
---

Parousia has no server, no account, and no analytics, so nothing about you is sent to the project. Everything runs on your computer. What leaves it is the presence Discord shows, plus what a few Activities ask their own sites for (described below).

## What the extension can see

- **Tabs.** The `tabs` permission gives it each tab's address and title, which is what matching an Activity needs. Nothing about your browsing is stored.
- **Storage.** Only your own settings: Privacy, Platforms, language, which Activities are on with their settings, and the Default Activity.
- **Page contents.** Nothing, until you turn on an Activity that reads pages. That asks your browser for that Activity's sites, one site at a time, from the same click. "All websites" has its own switch, off by default, and is never requested automatically. Taking access back stops what runs on that site at once.

There are no host permissions and no content scripts at install. The extension's Content Security Policy lets it connect only to its own files, Parousia Desktop, and Discord-RPC-Extension's local app.

## What leaves the browser

The extension sends Desktop the presence an Activity produced: a name, two lines of text, timestamps, image links, buttons and links, which platforms it may be shown on, and the Discord Application to show it as. It does not send the page's own address. If an Activity chooses to link to the page, that link is part of what it shows, and Discord shows it to people who look at your profile.

That text can come from the page: a video's title, a song's name, a game. Because it leaves the browser for Desktop and then Discord, Firefox's add-on page lists browsing activity and website content as data the extension handles, and asks you to accept that when you install it.

Desktop passes it to Discord through Discord's local socket on your computer. Discord fetches any images itself, from the addresses the Activity gave. The dashboard loads Activity icons from each Activity's own site, without sending a referrer, and falls back to a letter.

What Activities may read from a page (what is playing, thumbnails, creator icons) is one choice in Settings, Privacy, for all of them, and the Activity only gets what its declared kinds and your choices allow.

## What Activities request

No code is downloaded after you install Parousia. Every Activity, native or PreMiD's, is compiled into the extension when it is built, and nothing is fetched from PreMiD or anyone else to update or run it.

An Activity can still make requests of its own while it runs on a page you turned it on for:

- **Native Activities** only get the page's address and title, and can't make requests.
- **PreMiD's Activities** are PreMiD's code, included unchanged. Some ask their own site's API for details, the way the site's own scripts do. About a dozen were written to ask PreMiD's image service (`pd.premid.app`) to shorten a long image address or host a picture. Parousia answers those requests itself, so nothing is sent to PreMiD, and a picture that would have been uploaded is left out. What each one does is in its source in [PreMiD/Activities](https://github.com/PreMiD/Activities).

What Activities may read from pages is limited by Settings, Privacy, but a request to a site's own service is that Activity's code talking to a service you already use there, so those settings can't hold it back.

## What Desktop refuses

- **Anything not on your computer.** It listens on `127.0.0.1` only, and on Linux drops connections from other users of the machine before reading them.
- **Extensions it does not recognize.** It accepts an exact extension origin from the built-in store list or your `allowedOrigins`, and nothing broader. An unrecognized extension gets one refusal and is listed so you can allow it. Web pages get a bare `403`.
- **Userscripts, unless you turn them on.** They connect with a page's origin, which Desktop cannot tell from the page itself. A userscript can publish presence and cannot read status or change settings.
- **Malformed or oversized input.** Strict schemas, 16 KiB frames, short timeouts, per-connection and overall rate limits, and a 64-connection cap.

Desktop is also silent by default: no output and no event history unless you turn on debug logging for a run.

One known gap: any web page can tell whether Desktop is running, by whether its port answers. It cannot read anything from it.

## More

The full [threat model](https://github.com/Abadima/RPC/blob/main/project/threat-model.md) lists what Parousia defends against and what it does not. To report a vulnerability, use [private reporting](https://github.com/Abadima/RPC/security/advisories/new) rather than a public issue.
