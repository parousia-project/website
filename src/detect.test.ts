import { describe, expect, test } from "bun:test";
import { detectSystem } from "./detect";

const CHROME_WINDOWS =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36";
const FIREFOX_LINUX = "Mozilla/5.0 (X11; Linux x86_64; rv:150.0) Gecko/20100101 Firefox/150.0";
const FIREFOX_LINUX_ARM = "Mozilla/5.0 (X11; Linux aarch64; rv:150.0) Gecko/20100101 Firefox/150.0";
const CHROME_ANDROID =
  "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Mobile Safari/537.36";
const SAFARI_MAC =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/19.0 Safari/605.1.15";

describe("detectSystem", () => {
  test("reads the system from the user agent", () => {
    expect(detectSystem({ userAgent: CHROME_WINDOWS })).toEqual({ os: "windows", arch: "x86_64" });
    expect(detectSystem({ userAgent: FIREFOX_LINUX })).toEqual({ os: "linux", arch: "x86_64" });
    expect(detectSystem({ userAgent: FIREFOX_LINUX_ARM })).toEqual({
      os: "linux",
      arch: "aarch64",
    });
  });

  test("prefers the client hints, which can tell Windows on ARM apart", () => {
    expect(
      detectSystem({ userAgent: CHROME_WINDOWS, platform: "Windows", architecture: "arm" }),
    ).toEqual({ os: "windows", arch: "aarch64" });
    expect(
      detectSystem({ userAgent: CHROME_WINDOWS, platform: "Windows", architecture: "x86" }),
    ).toEqual({ os: "windows", arch: "x86_64" });
  });

  test("has nothing to offer on systems without a build", () => {
    expect(detectSystem({ userAgent: SAFARI_MAC })).toBeNull();
    expect(detectSystem({ userAgent: CHROME_ANDROID })).toBeNull();
    expect(detectSystem({ userAgent: CHROME_ANDROID, platform: "Android" })).toBeNull();
    expect(detectSystem({ userAgent: "" })).toBeNull();
  });
});
