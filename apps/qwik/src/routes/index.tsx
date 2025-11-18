import { component$, useSignal } from '@builder.io/qwik';
import Lenis from 'lenis';

export default component$(() => {
  const clicks = useSignal(0);

  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100">
      <header class="mx-auto flex max-w-4xl flex-col gap-3 px-6 py-12">
        <p class="text-sm uppercase tracking-[0.25em] text-cyan-300">Qwik Mini-game</p>
        <h1 class="text-4xl font-semibold">Zero-hydration hero micro-interaction</h1>
        <p class="max-w-2xl text-slate-300">
          Demonstrates Qwik resumability for instant interaction. Lenis is queued for smooth scroll once
          installed.
        </p>
        <button
          class="w-fit rounded-full bg-cyan-300 px-5 py-2 text-slate-900 transition hover:scale-105"
          onClick$={() => (clicks.value += 1)}
        >
          Tap to gain XP ({clicks.value})
        </button>
      </header>
    </div>
  );
});
