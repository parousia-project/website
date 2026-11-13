---
layout: ../../layouts/Docs.astro
title: Compatibility
description: Browsers, platforms, PreMiD, Discord-RPC-Extension, and MAL-Sync.
---

## Browsers and systems

|           | Supported                                                                                                                                                                                                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Browsers  | Chrome and Edge (one Chromium build, on the [Chrome Web Store](https://chromewebstore.google.com/detail/parousia/achhedhokopfgfnigkfchklhbebbhebd)), Firefox (on [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/parousia/)), and a userscript in Violentmonkey, Tampermonkey, or ScriptCat |
| Desktop   | Windows 10/11 and Linux, on x86_64 and ARM64                                                                                                                                                                                                                                                                 |
| Platforms | Discord. Fluxer and Stoat are planned, each as one more Desktop adapter                                                                                                                                                                                                                                      |

There is no Safari build and no macOS build of Desktop. The extension sticks to standard WebExtension APIs, so a Safari version stays possible, but nothing here builds or releases one.

## PreMiD Activities

Supported, unchanged: see [Activities](../activities/). Each runs as its own Discord Application, the one its source names.

## Discord-RPC-Extension

For anyone who prefers not to run Parousia Desktop, Parousia's extension can drive Discord through the app that [Discord-RPC-Extension](https://github.com/lolamtisch/Discord-RPC-Extension) installs (`discord_rpc_ext`, port 6969):

- The extension talks to that app directly while Parousia Desktop is not connected. It is on by default and switched in Settings, Platforms. It sends plain Rich Presence and nothing else, and only to `127.0.0.1`.
- It stands in for Desktop rather than running beside it: while Desktop is connected, Desktop shows Discord itself and this link sends nothing.
- Parousia's Desktop does not answer on port 6969 as a stand-in for that app, because doing so would mean accepting presence from any page or extension.
- Parousia can also register with Discord-RPC-Extension's browser extension over cross-extension messaging. That path is built but switched off until a Discord Application is chosen for it.

## MAL-Sync

Turn it on in Settings, Platforms, under Other extensions. What [MAL-Sync](https://github.com/MALSync/MALSync) recognizes on anime and manga sites then shows as the Activity in place of the site's own, and it reaches Discord through Desktop like anything else.

Parousia asks MAL-Sync's background for the tab it is sharing, the same way [Discord-RPC-Extension](https://github.com/lolamtisch/Discord-RPC-Extension)'s extension does, and takes the reply as its Activity. It sends only a tab number and listens for nothing. MAL-Sync answers no matter what its own "Discord Rich Presence" setting says: it checks neither who asks nor that setting, so Parousia works with it either way. If that setting is on, MAL-Sync may show the same presence itself, which is why the switch's hint suggests turning it off.

While MAL-Sync has something for the page, it takes the page over; the site's own Activity comes back when it doesn't. On a page it recognizes, it is asked again every 15 seconds, like Discord-RPC-Extension asks; elsewhere a few times after the page opens, and an idle tab is never woken.

The reply is an untrusted page's reading, so it goes through the same parsing and bounds as a PreMiD Activity's. Only Discord Applications MAL-Sync itself uses are kept, a reply naming another is turned down whole, and links back to the page's own site are dropped, because a page's address stays in the browser. Parousia takes only Rich Presence from MAL-Sync, and only for the tab being shared.
