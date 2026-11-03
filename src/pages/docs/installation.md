---
layout: ../../layouts/Docs.astro
title: Installation
description: Install the Parousia extension from the Chrome Web Store or Firefox Add-ons, then Parousia Desktop.
---

Parousia has two parts: the browser extension and Parousia Desktop, which shows your presence on Discord. Install the extension from your browser's store, then download Desktop.

## Before you start

- The Discord desktop app, running on the same computer. Desktop talks to it locally, so Discord in a browser cannot show Rich Presence.
- Windows 10 or 11, or Linux, on x86_64 or ARM64. There is no macOS build yet.
- Chrome, Edge, another Chromium browser, or Firefox.

## Install the extension

**Chrome, Edge, and other Chromium browsers:** install Parousia from the [Chrome Web Store](https://chromewebstore.google.com/detail/parousia/achhedhokopfgfnigkfchklhbebbhebd). Desktop recognizes this build without any further step.

**Firefox:** install Parousia from [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/parousia/). Mozilla signs it, so Firefox keeps it. Desktop has to allow it once; see [Allow the extension in Desktop](#allow-the-extension-in-desktop).

The stores keep the extension up to date. If a store is not an option, [install by hand](#install-by-hand).

## Install Parousia Desktop

1. Download the file for your system from the [install page](../../download/#desktop).
2. On Linux, make it executable with `chmod +x parousia-desktop-linux-x86_64` (or the `aarch64` file) and run it. On Windows, double-click the `.exe`.
3. It runs in the background with a tray icon where your system shows one (Linux desktops with StatusNotifier support, and Windows). `--headless` starts it without.

Only one copy runs per user. Starting it again shows a notification that it is already running, then exits. If another program holds port 57179, Desktop exits and says so. Starting Desktop at login is not built in yet, so add it to your system's startup list if you want that.

## Allow the extension in Desktop

Desktop only talks to extensions it recognizes, by their exact identity. The Chrome Web Store build is recognized already. Firefox picks a new random identity for every install, and an unpacked Chromium build has its own, so those need to be allowed once:

- The extension's popup shows the exact command to run, for example `Parousia-Desktop allow chrome-extension://<id>`.
- Or open the tray menu, Diagnostics, Refused, and choose Allow next to the extension.

On Windows the commands only print help and the version for now, so use the tray menu.

## Check that it works

Open the extension's popup and expand it to the dashboard. The Default Activity tab lets you write a presence by hand and shows it on Discord straight away, without a supported site. To see a real Activity, open a site one covers and turn it on from the Activities tab. Activities that read the page are off until you turn them on; ones that use only the address and title are on.

## Install by hand

Use these when a store is not an option. Both come from the newest release; the files are on the [install page](../../download/#by-hand).

### Extension zips

**Chromium:**

1. Unzip `parousia-chromium.zip` somewhere it can stay.
2. Open `chrome://extensions` (`edge://extensions` in Edge) and turn on Developer mode.
3. Choose Load unpacked and pick the unzipped folder.

**Firefox:** the zip is unsigned, so Firefox loads it only as a temporary add-on. Open `about:debugging`, choose This Firefox, then Load Temporary Add-on, and pick `parousia-firefox.zip`. It lasts until Firefox closes. Firefox Developer Edition and Nightly can keep it: set `xpinstall.signatures.required` to `false` in `about:config`, then use Install Add-on From File in the add-ons page.

Both need to be [allowed in Desktop](#allow-the-extension-in-desktop).

### Userscript

Install `parousia.user.js` in Violentmonkey, Tampermonkey, or ScriptCat. Then turn on Allow userscripts in Desktop, from the extension's Settings, the tray menu, or `Parousia-Desktop set userscripts on`. It is off by default because it lets any web page connect to Desktop. A userscript can publish presence and nothing else. Your manager's menu has a Parousia Desktop status command that reports whether it can connect.
