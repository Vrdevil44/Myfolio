<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import riveCanvas, { type RiveCanvas } from 'rive-canvas';

  export let label = 'Network cable flourish';

  let canvas: HTMLCanvasElement | null = null;
  let rive: RiveCanvas | undefined;

  onMount(async () => {
    if (!canvas) return;
    const riveModule = await riveCanvas();
    rive = await riveModule.load({
      src: 'https://cdn.rive.app/animations/vehicles.riv',
      canvas,
      autoplay: true,
      stateMachines: ['bounce']
    });
  });

  onDestroy(() => {
    if (rive) {
      rive.cleanup();
    }
  });
</script>

<div class="flex items-center gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-3">
  <canvas bind:this={canvas} width={120} height={80} class="rounded-lg bg-[color:var(--bg-primary)]"></canvas>
  <div>
    <p class="text-sm font-semibold text-[color:var(--text-primary)]">{label}</p>
    <p class="text-xs text-[color:var(--text-muted)]">Animated with Rive to spotlight untapped tooling.</p>
  </div>
</div>
