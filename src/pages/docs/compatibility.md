---
layout: ../../layouts/Docs.astro
title: Compatibility
description: Browsers, platforms, PreMiD, Discord-RPC-Extension, and MAL-Sync.
---

## Browsers and systems

|           | Supported                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------ |
| Browsers  | Chrome and Edge (one Chromium build), Firefox, and a userscript in Violentmonkey, Tampermonkey, or ScriptCat |
| Desktop   | Windows 10/11 and Linux, on x86_64 and ARM64                                                                 |
| Platforms | Discord. Fluxer and Stoat are planned, each as one more Desktop adapter                                      |

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

Under evaluation. MAL-Sync keeps its own detection, and Parousia adds none of its own for it. MAL-Sync does not push presence: it registers with Discord-RPC-Extension and answers that extension's requests with a Discord presence under its own Discord Applications. So today it shows on Discord through Discord-RPC-Extension, beside whatever Parousia shows.

Where it is practical, Parousia's extension will ask MAL-Sync for the active tab's presence in the same way and publish it to Desktop over the usual connection, so it becomes one presence over one Discord connection. If that needs anything invasive on either side, MAL-Sync stays as it is, running beside Parousia.
