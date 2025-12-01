<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { animate } from 'motion';

  export let role: string;
  export let company: string;
  export let timeframe: string;
  export let highlights: string[] = [];
  export let location: string | undefined = undefined;
  export let icon = 'i-tabler-briefcase';

  const dispatch = createEventDispatcher<{ focus: void }>();
  let card: HTMLDivElement | null = null;

  onMount(() => {
    if (!card) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(
              entry.target as HTMLElement,
              { opacity: [0, 1], y: [16, 0] },
              { duration: 0.45, easing: 'easeOut' }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  });
</script>

<article
  bind:this={card}
  class="grid gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[color:var(--accent-2)]"
  on:mouseenter={() => dispatch('focus')}
>
  <div class="flex items-start justify-between gap-3">
    <div class="flex items-center gap-3">
      <span
        class={`i-tabler ${icon} h-10 w-10 rounded-full bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent-2)] p-2 text-slate-950`}
      ></span>
      <div>
        <h3 class="text-lg font-semibold text-[color:var(--text-primary)]">
          {role}
        </h3>
        <p class="text-sm text-[color:var(--text-muted)]">{company}</p>
        {#if location}
          <p class="text-xs text-[color:var(--text-muted)]">{location}</p>
        {/if}
      </div>
    </div>
    <span
      class="rounded-full bg-[color:var(--bg-primary)] px-3 py-1 text-xs font-semibold text-[color:var(--accent-2)]"
    >
      {timeframe}
    </span>
  </div>
  {#if highlights?.length}
    <ul
      class="list-inside list-disc space-y-1 text-sm text-[color:var(--text-muted)]"
    >
      {#each highlights as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}
</article>
