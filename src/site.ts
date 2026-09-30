/** Where Parousia's pieces live and what a release contains; change it here if a repository moves. */
export const REPO_SLUG = "Abadima/RPC";
export const REPO = `https://github.com/${REPO_SLUG}`;
export const ACTIVITIES_REPO = "https://github.com/parousia-project/activities";
export const WEBSITE_REPO = "https://github.com/parousia-project/website";

/** Release asset names carry no version, so these links always reach the newest release. */
export const RELEASES = `${REPO}/releases/latest`;
export const downloadUrl = (file: string): string => `${RELEASES}/download/${file}`;

export type Os = "windows" | "linux";
export type Arch = "x86_64" | "aarch64";

export interface DesktopBuild {
  os: Os;
  arch: Arch;
  label: string;
  file: string;
}

export const DESKTOP_BUILDS: readonly DesktopBuild[] = [
  {
    os: "windows",
    arch: "x86_64",
    label: "Windows 10/11, Intel or AMD",
    file: "parousia-desktop-windows-x86_64.exe",
  },
  {
    os: "windows",
    arch: "aarch64",
    label: "Windows 11 on ARM64",
    file: "parousia-desktop-windows-aarch64.exe",
  },
  {
    os: "linux",
    arch: "x86_64",
    label: "Linux, Intel or AMD",
    file: "parousia-desktop-linux-x86_64",
  },
  {
    os: "linux",
    arch: "aarch64",
    label: "Linux on ARM64",
    file: "parousia-desktop-linux-aarch64",
  },
];

export interface Package {
  label: string;
  file: string;
}

export const EXTENSIONS: readonly Package[] = [
  { label: "Chrome, Edge, and other Chromium browsers", file: "parousia-chromium.zip" },
  { label: "Firefox", file: "parousia-firefox.zip" },
];

export const USERSCRIPT: Package = {
  label: "Userscript (Violentmonkey, Tampermonkey, ScriptCat)",
  file: "parousia.user.js",
};
