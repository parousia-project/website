import type { Arch, Os } from "./site";

export interface ClientHints {
  userAgent: string;
  /** `navigator.userAgentData.platform`, where the browser has it. */
  platform?: string | undefined;
  /** `architecture` from `getHighEntropyValues`, where the browser answers ("x86" or "arm"). */
  architecture?: string | undefined;
}

function osOf(text: string | undefined): Os | null {
  if (!text || /android/i.test(text)) return null;
  if (/windows|win32|win64/i.test(text)) return "windows";
  if (/linux/i.test(text)) return "linux";
  return null;
}

/**
 * Which Desktop build a visitor most likely wants, or `null` when Parousia
 * Desktop has none for their system. It is a guess: a browser running under
 * emulation on ARM says it is Intel, which is why the page lists every build.
 */
export function detectSystem(hints: ClientHints): { os: Os; arch: Arch } | null {
  const os = osOf(hints.platform) ?? osOf(hints.userAgent);
  if (!os) return null;
  const arm = hints.architecture
    ? hints.architecture === "arm"
    : /aarch64|arm64/i.test(hints.userAgent);
  return { os, arch: arm ? "aarch64" : "x86_64" };
}
