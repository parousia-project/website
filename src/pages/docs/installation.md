---
layout: ../../layouts/Docs.astro
title: Installation
description: Install Parousia Desktop and the browser extension or userscript.
---

Two things get installed: Parousia Desktop, which shows your presence on Discord, and a way for your browser to reach it, either the extension or the userscript.

## What you need

- The Discord desktop app, running on the same computer. Desktop talks to it locally, so the web version of Discord cannot show Rich Presence.
- Windows 10 or 11, or Linux, on x86_64 or ARM64. There is no macOS build yet.
- Chrome, Edge, another Chromium browser, or Firefox.

## Parousia Desktop

1. Download the file for your system from the [download page](../../download/).
2. On Linux, make it executable with `chmod +x parousia-desktop-linux-x86_64` (or the `aarch64` file) and run it. On Windows, double-click the `.exe`.
3. It runs in the background with a tray icon where your system shows one (Linux desktops with StatusNotifier support, and Windows). `--headless` starts it without.

Only one copy runs per user. Starting it again shows a notification that it is already running, then exits. If another program holds port 57179, Desktop exits and says so. Starting Desktop at login is not built in yet, so add it to your system's startup list if you want that.

## The browser extension

Store listings are not up yet, so the extension installs from the zip on the [download page](../../download/).

### Chrome, Edge, and other Chromium browsers

1. Unzip `parousia-chromium.zip` somewhere it can stay.
2. Open `chrome://extensions` (`edge://extensions` in Edge) and turn on Developer mode.
3. Choose Load unpacked and pick the unzipped folder.

### Firefox

Firefox keeps only add-ons signed by Mozilla, so the zip loads as a temporary add-on: open `about:debugging`, choose This Firefox, then Load Temporary Add-on, and pick `parousia-firefox.zip`. It lasts until Firefox closes. Firefox Developer Edition and Nightly can keep it: set `xpinstall.signatures.required` to `false` in `about:config`, then use Install Add-on From File in the add-ons page.

### Allow the extension in Desktop

Desktop only talks to extensions it recognizes, by their exact identity. Builds from the stores will be recognized without any step once they exist. Until then, allow yours once:

- The extension's popup shows the exact command to run, for example `Parousia-Desktop allow chrome-extension://<id>`.
- Or open the tray menu, Diagnostics, Refused, and choose Allow next to the extension.

On Windows the commands only print help and the version for now, so use the tray menu.

## The userscript

Install `parousia.user.js` from the [download page](../../download/) in Violentmonkey, Tampermonkey, or ScriptCat. Then turn on Allow userscripts in Desktop, from the extension's Settings, the tray menu, or `Parousia-Desktop set userscripts on`. It is off by default because it lets any web page connect to Desktop. A userscript can publish presence and nothing else. Your manager's menu has a Parousia Desktop status command that reports whether it can connect.

## Check that it works

Open the extension's popup and expand it to the dashboard. Its Default Activity tab lets you write a presence by hand and shows it on Discord straight away, without needing a supported site. To see a real Activity, open a site one covers and turn it on from the Activities tab. Activities that read the page are off until you do; ones that use only the address and title are on.
