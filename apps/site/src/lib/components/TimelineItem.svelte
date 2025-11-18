<script lang="ts">
  export let role: string;
  export let company: string;
  export let timeframe: string;
  export let highlights: string[] = [];
</script>

<article class="grid gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4 shadow-sm">
  <div class="flex items-center justify-between gap-3">
    <div class="flex items-center gap-3">
      <span class="h-10 w-10 rounded-full bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent-2)]"></span>
      <div>
        <h3 class="text-lg font-semibold text-[color:var(--text-primary)]">{role}</h3>
        <p class="text-sm text-[color:var(--text-muted)]">{company}</p>
      </div>
    </div>
    <span class="rounded-full bg-[color:var(--bg-primary)] px-3 py-1 text-xs font-semibold text-[color:var(--accent-2)]">
      {timeframe}
    </span>
  </div>
  {#if highlights?.length}
    <ul class="list-inside list-disc text-sm text-[color:var(--text-muted)]">
      {#each highlights as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}
</article>
