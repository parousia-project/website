---
layout: ../../layouts/Docs.astro
title: Configuration
description: The extension's settings, Parousia Desktop's commands, and its config file.
---

## The extension

Open the popup and expand it to the dashboard. It has four tabs: Overview, Activities, Default Activity, and Settings.

**Activities** lists every Activity with a switch, enabled ones first and then disabled ones, each by name. An Activity page shows its own settings, if it has any. Turning on an Activity that reads pages asks your browser for the sites it needs, from the same click. If you decline, it stays off and says why.

- **Search and filter.** The Filter button beside the search box offers Enabled, Disabled, Parousia Activities, and PreMiD Activities. Choices in the same group add up (Enabled and Disabled is everything) and the two groups narrow each other (Enabled and PreMiD is PreMiD's Activities that are on). The search, filters, and page stay in the address, so reloading keeps them.
- **Both sources.** A website that Parousia and PreMiD both cover is listed once. Parousia's version runs unless you pick PreMiD's on the Activity's page, and only one of them ever runs.
- **Enable or disable all.** The quiet "Enable or disable all…" link under the search opens a panel that applies to everything the search and filters currently match, on every page, and asks once more before doing anything. Enabling Activities that read pages makes your browser ask for access to all their sites in one prompt, which can be long. If you decline, those Activities stay off, and nothing is turned on for a site your browser did not grant.

**Settings** has these pages:

| Page        | What it covers                                                                                                          |
| ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| General     | Language, and Parousia Desktop, including Allow userscripts                                                             |
| Privacy     | What is shared, what Activities may read from pages (what is playing, thumbnails, creator icons), and incognito windows |
| Site access | Every site you have granted, each removable, and Access your data for all websites, which is off by default             |
| Platforms   | Which platforms Activities are shown on. Discord today; Fluxer and Stoat are planned                                    |
| About       | Version, license, and links                                                                                             |

**Default Activity** is a presence you write by hand. It is shared wherever no Activity applies, through the same Privacy settings and platforms as any Activity.

## Parousia Desktop

These commands talk to the running Desktop over its local socket, so on Linux for now. On Windows, use the tray menu; the executable only answers `--help` and `--version`. Add `--json` for machine-readable output.

| Command                                    | Does                                                                               |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| `Parousia-Desktop status`                  | Shows connected browsers, Discord, settings, refused extensions, and recent events |
| `Parousia-Desktop allow <origin>`          | Accepts an extension build by its exact origin                                     |
| `Parousia-Desktop disallow <origin>`       | Stops accepting it and closes its connections                                      |
| `Parousia-Desktop set userscripts on\|off` | Allows userscripts (any web page can connect; off by default)                      |
| `Parousia-Desktop debug on\|off`           | Turns debug logging and event history on for this run only                         |

Started with no command, it runs Desktop; `--headless` runs it without a tray icon and `--debug` starts with debug logging on.

### Config file

`config.json` lives in Desktop's data directory: `~/.local/share/parousia` on Linux and `%APPDATA%\parousia` on Windows. Desktop keeps it readable by you only and rewrites it when settings change. You can also edit it by hand while Desktop is stopped.

```json
{
  "allowedOrigins": ["chrome-extension://<32-letter id>", "moz-extension://<uuid>"],
  "allowUserscripts": false,
  "discordClientId": "<Discord Application id>"
}
```

Every key is optional. `discordClientId` replaces the Discord Application that Activities without their own show as. A key it does not know, an `allowedOrigins` entry that is not an exact extension origin, or a bad `discordClientId` stops Desktop at startup, so a typo cannot quietly change what it accepts.

### Logging

Desktop prints nothing and keeps no event history unless debug logging is on, and that setting is never saved. Turn it on for one run with `--debug`, the tray, or `Parousia-Desktop debug on`.

### Ports

Desktop listens on `127.0.0.1:57179` and nowhere else. While Desktop is not connected, and the Discord-RPC-Extension backend is on (Settings, Platforms), the extension talks to that app on `127.0.0.1:6969` instead; see [Compatibility](../compatibility/).
