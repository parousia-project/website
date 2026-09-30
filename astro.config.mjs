// @ts-check
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://parousia.abadima.dev",
  // With compression on, Astro drops the space where a line break sits between
  // text and a link, and the formatter moves line breaks.
  compressHTML: false,
  integrations: [svelte()],
});
