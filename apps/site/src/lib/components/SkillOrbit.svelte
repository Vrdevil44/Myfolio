<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import type { ResumeSkillCategory } from '$lib/types/resume';

  export let skills: ResumeSkillCategory[] = [];

  let rotation = 0;
  let frameId: number;
  let orbitEl: HTMLDivElement | null = null;

  const animate = () => {
    rotation = (rotation + 0.15) % 360;
    if (orbitEl) {
      orbitEl.style.setProperty('--rotation', `${rotation}deg`);
    }
    frameId = requestAnimationFrame(animate);
  };

  onMount(() => {
    frameId = requestAnimationFrame(animate);
  });

  onDestroy(() => cancelAnimationFrame(frameId));

  const radius = (index: number) => 120 + index * 26;
</script>

<div class="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
  <div class="relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--bg-elevated)] to-[color:var(--bg-primary)] p-6">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(103,232,249,0.18),transparent_35%)]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(124,58,237,0.18),transparent_30%)]"></div>
    <div class="relative h-[360px] w-full">
      <div
        bind:this={orbitEl}
        class="absolute inset-0 origin-center"
        style="transform: rotate3d(0.2, 1, 0, var(--rotation, 0deg)); transform-style: preserve-3d;"
      >
        {#each skills as category, index}
          <div
            class="skill-node"
            style={`--radius:${radius(index)}px; --index:${index}; --count:${skills.length}; --intensity:${category.intensity ?? 0.5};`}
          >
            <div class="node-face">
              <div class="text-xs uppercase tracking-[0.3em] text-[color:var(--accent-2)]">Orbit</div>
              <div class="text-lg font-semibold text-[color:var(--text-primary)]">{category.name}</div>
              <div class="mt-2 flex flex-wrap gap-1 text-[10px] text-[color:var(--text-muted)]">
                {#each category.tools as tool}
                  <span class="rounded-full border border-[color:var(--border)] px-2 py-1">{tool}</span>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-5">
    <p class="text-sm text-[color:var(--text-muted)]">
      Use the orbit as a tactile map of Vibhu's toolchain. Drag to rotate and explore each cluster; the orbit keeps
      moving even when you pause. A plaintext list remains available for accessibility.
    </p>
    <ul class="mt-4 space-y-3 text-sm text-[color:var(--text-primary)]">
      {#each skills as category}
        <li class="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-primary)]/70 p-3">
          <div class="flex items-center justify-between">
            <span class="font-semibold">{category.name}</span>
            <span class="text-[color:var(--accent-2)]">{Math.round((category.intensity ?? 0.5) * 100)}%</span>
          </div>
          <div class="mt-1 text-xs text-[color:var(--text-muted)]">{category.tools.join(' · ')}</div>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .skill-node {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    transform: translate(-50%, -50%) rotateY(calc(var(--index) * (360deg / var(--count)))) translateZ(var(--radius));
    transition: transform 200ms ease;
  }

  .skill-node::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateZ(-1px);
    background: radial-gradient(circle, rgba(103, 232, 249, 0.35), transparent 60%);
    opacity: 0.6;
  }

  .skill-node:hover {
    transform: translate(-50%, -50%) rotateY(calc(var(--index) * (360deg / var(--count)))) translateZ(calc(var(--radius) + 16px));
  }

  .node-face {
    position: absolute;
    inset: 0;
    padding: 16px;
    border: 1px solid var(--border);
    border-radius: 18px;
    background: linear-gradient(145deg, rgba(124, 58, 237, 0.18), rgba(15, 23, 42, 0.8));
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(8px);
    transform: rotateY(calc(var(--rotation, 0deg))) translateZ(calc((var(--intensity) + 0.4) * 40px));
  }
</style>
