<script lang="ts">
  import { animate, spring } from 'motion';
  import { onMount } from 'svelte';

  let badge: HTMLDivElement | null = null;
  let clicks = 0;

  const levelUp = () => {
    clicks += 1;
    if (!badge) return;
    animate(badge, { scale: [1, 1.12, 1] }, { duration: 0.35, easing: spring({ stiffness: 380, damping: 20 }) });
  };

  onMount(() => {
    if (!badge) return;
    animate(
      badge,
      { rotate: [0, 2, -2, 0] },
      { duration: 4, easing: 'ease-in-out', repeat: Infinity, repeatDelay: 1 }
    );
  });
</script>

<div class="grid gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-5">
  <div class="flex items-center justify-between">
    <div class="space-y-1">
      <p class="text-xs uppercase tracking-[0.2em] text-[color:var(--accent-2)]">Mini game</p>
      <h3 class="text-xl font-semibold text-[color:var(--text-primary)]">Momentum Tap</h3>
      <p class="text-sm text-[color:var(--text-muted)]">Earn streaks and micro-interactions in the hero.</p>
    </div>
    <div
      bind:this={badge}
      class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent-2)] text-lg font-bold text-slate-900 shadow-lg"
    >
      {clicks}
    </div>
  </div>
  <button
    class="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent-2)] px-4 py-2 text-sm font-semibold text-slate-950 shadow-md transition hover:translate-y-[-1px] hover:shadow-lg"
    on:click={levelUp}
  >
    Tap to level up
    <span class="i-tabler-sparkles"></span>
  </button>
</div>
