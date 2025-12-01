<script lang="ts">
  export let name: string;
  export let description: string;
</script>

<article
  class="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4 transition hover:-translate-y-1 hover:border-[color:var(--accent-2)] hover:shadow-xl"
>
  <div
    class="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
    aria-hidden="true"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-[color:var(--accent)]/15 via-transparent to-[color:var(--accent-2)]/10"
    ></div>
  </div>
  <div class="relative z-10 space-y-2">
    <div class="flex items-center gap-2 text-[color:var(--accent-2)]">
      <span class="i-tabler-rocket"></span>
      <p class="text-xs font-semibold uppercase tracking-[0.2em]">
        Playable concept
      </p>
    </div>
    <h3 class="text-xl font-semibold text-[color:var(--text-primary)]">
      {name}
    </h3>
    <p class="text-[color:var(--text-muted)]">{description}</p>
    <button
      class="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-2)]"
    >
      Launch mini-game
      <span class="i-tabler-arrow-up-right"></span>
    </button>
  </div>
</article>
