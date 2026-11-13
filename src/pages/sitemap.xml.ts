import type { APIRoute } from "astro";
import { DOCS } from "../docs";

/** Every canonical URL of the site, relative to the origin, with a trailing slash. */
const PAGES = [
  "",
  "compare/",
  "download/",
  "docs/",
  ...DOCS.filter((doc) => doc.slug).map((doc) => `docs/${doc.slug}`),
];

export const GET: APIRoute = ({ site }) => {
  // The Pages workflow passes GitHub's origin as --site, and the Pages API can
  // report a custom domain with an http scheme, so the scheme is forced here.
  const origin = `https://${site?.host ?? "parousia.abadima.dev"}`;
  const urls = PAGES.map((path) => `  <url><loc>${origin}/${path}</loc></url>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
