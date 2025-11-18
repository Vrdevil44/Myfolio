import { render } from 'solid-js/web';
import { Motion, Presence } from '@motionone/solid';
import { createSignal } from 'solid-js';

const App = () => {
  const [show, setShow] = createSignal(true);

  return (
    <main class="min-h-screen bg-slate-950 text-slate-100">
      <section class="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-14">
        <p class="text-sm uppercase tracking-[0.3em] text-amber-300">Solid Micro-interactions</p>
        <h1 class="text-4xl font-semibold">Fine-grained reactivity module</h1>
        <p class="max-w-2xl text-slate-300">
          Quick motion demo toggled without re-rendering the world. Ideal for UI islands within Astro or
          SvelteKit embeds.
        </p>
        <button
          class="w-fit rounded-full bg-amber-300 px-4 py-2 text-slate-950 transition hover:scale-105"
          onClick={() => setShow((prev) => !prev)}
        >
          Toggle spark
        </button>
        <Presence>
          {show() && (
            <Motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.35 }}
              class="grid place-items-center rounded-xl border border-slate-800 bg-slate-900/80 p-6"
            >
              <p class="text-lg font-semibold text-amber-200">Micro-interactions ready</p>
              <p class="text-sm text-slate-300">Attach this to any host page as an island.</p>
            </Motion.div>
          )}
        </Presence>
      </section>
    </main>
  );
};

render(() => <App />, document.getElementById('root')!);
