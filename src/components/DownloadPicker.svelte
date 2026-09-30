<script lang="ts">
  import { detectSystem } from "../detect";
  import type { Arch, Os } from "../site";

  interface Build {
    os: Os;
    arch: Arch;
    label: string;
    file: string;
    url: string;
  }

  interface UserAgentData {
    platform: string;
    getHighEntropyValues(hints: string[]): Promise<{ architecture?: string }>;
  }

  let { builds }: { builds: Build[] } = $props();
  let system = $state<{ os: Os; arch: Arch } | null>(null);
  const pick = $derived(builds.find((b) => b.os === system?.os && b.arch === system?.arch));

  // Effects only run in the browser, so the server-rendered page is just the table.
  $effect(() => {
    const data = (navigator as Navigator & { userAgentData?: UserAgentData }).userAgentData;
    const hints = { userAgent: navigator.userAgent, platform: data?.platform };
    system = detectSystem(hints);
    data?.getHighEntropyValues(["architecture"]).then(
      ({ architecture }) => (system = detectSystem({ ...hints, architecture })),
      () => {},
    );
  });
</script>

{#if pick}
  <div class="pick">
    <p>Parousia Desktop for your system, going by what your browser says:</p>
    <a class="button primary" href={pick.url}>{pick.label}</a>
  </div>
{/if}
