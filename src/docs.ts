/** The documentation pages, in the order the sidebar and the docs index list them. */
export interface Doc {
  /** Path under `/docs/`, with a trailing slash; empty for the index. */
  slug: string;
  title: string;
  summary: string;
}

export const DOCS: readonly Doc[] = [
  {
    slug: "",
    title: "Overview",
    summary: "What Parousia is made of and how the pieces fit together.",
  },
  {
    slug: "installation/",
    title: "Installation",
    summary: "Install Parousia Desktop and the browser extension or userscript.",
  },
  {
    slug: "configuration/",
    title: "Configuration",
    summary: "The extension's settings, Parousia Desktop's commands, and its config file.",
  },
  {
    slug: "activities/",
    title: "Activities",
    summary: "How sites are detected, PreMiD support, and writing your own in TypeScript.",
  },
  {
    slug: "compatibility/",
    title: "Compatibility",
    summary: "Browsers, platforms, PreMiD, Discord-RPC-Extension, and MAL-Sync.",
  },
  {
    slug: "privacy/",
    title: "Privacy and security",
    summary: "What Parousia reads, what leaves your browser, and what it refuses.",
  },
  {
    slug: "development/",
    title: "Development",
    summary: "Set up the repositories, run the checks, and cut a release.",
  },
];
