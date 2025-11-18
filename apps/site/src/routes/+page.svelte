<script lang="ts">
  import Lenis from 'lenis';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { animate, spring } from 'motion';

  const score = writable(0);

  onMount(() => {
    const lenis = new Lenis();
    let raf: number;

    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    animate('.spark', { opacity: [0, 1, 0] }, { duration: 2, repeat: Infinity });

    return () => cancelAnimationFrame(raf);
  });

  const levelUp = () => {
    score.update((value) => value + 10);
    const button = document.querySelector('button');
    if (button) {
      animate(
        button,
        { scale: [1, 1.05, 1] },
        { easing: spring({ stiffness: 400, damping: 20 }), duration: 0.35 }
      );
    }
  };
</script>

<svelte:head>
  <title>Myfolio · Vibhu Dikshit</title>
  <meta
    name="description"
    content="Interactive, gamified portfolio scaffold using SvelteKit, UnoCSS, and micro-interactions."
  />
</svelte:head>

<main class="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 font-sans">
  <section class="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] text-lime-300">Phase 1 · Ready</p>
        <h1 class="text-4xl font-bold md:text-5xl">Myfolio – Gamified Portfolio</h1>
        <p class="mt-3 max-w-2xl text-slate-300">
          SvelteKit core with Astro, Solid, and Qwik islands planned. Animations powered by GSAP,
          micro-interactions, and smooth scrolling baked in.
        </p>
      </div>
      <div class="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 shadow-lg">
        <p class="text-sm text-slate-400">Score</p>
        <div class="flex items-baseline gap-2 text-lime-300">
          <span class="text-4xl font-semibold">{$score}</span>
          <span class="spark text-xs uppercase tracking-[0.3em] text-lime-500">Xp</span>
        </div>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <div class="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-white">Tech Stack</h2>
        <ul class="mt-4 space-y-2 text-slate-200">
          <li>⚡ SvelteKit core with UnoCSS utilities</li>
          <li>🪐 Astro islands and blog ready</li>
          <li>🎮 Qwik mini-game and Solid micro-interactions</li>
          <li>🌀 GSAP, Rive, Threlte/Three.js, Lenis, Tone.js, and p5.js</li>
        </ul>
      </div>

      <div class="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
        <h2 class="text-2xl font-semibold text-white">Quest Log</h2>
        <ol class="mt-4 space-y-3 text-slate-200">
          <li>Set up monorepo with pnpm workspaces</li>
          <li>Define linting, formatting, and commit rules</li>
          <li>Prepare deployment pipelines for GitHub Pages</li>
          <li>Load resume data from human-friendly YAML</li>
        </ol>
        <button
          class="mt-6 inline-flex items-center gap-2 rounded-full bg-lime-400 px-4 py-2 text-slate-950 transition hover:scale-105 hover:bg-lime-300"
          on:click={levelUp}
        >
          Level Up
        </button>
      </div>
    </div>
  </section>
</main>
