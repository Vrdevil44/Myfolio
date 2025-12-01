<script lang="ts">
  export let id: string;
  export let title: string;
  export let eyebrow: string | undefined = undefined;
  export let description: string | undefined = undefined;
</script>

<section {id} class="section-shell">
  <div class="section-header">
    {#if eyebrow}
      <p class="section-eyebrow">{eyebrow}</p>
    {/if}
    <div class="flex flex-wrap items-end justify-between gap-3">
      <h2 class="section-title">{title}</h2>
      <slot name="action" />
    </div>
    {#if description}
      <p class="section-description">{description}</p>
    {/if}
  </div>
  <div class="section-body">
    <slot />
  </div>
</section>

<style>
  .section-shell {
    position: relative;
    border: 1px solid var(--border);
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.03),
      rgba(255, 255, 255, 0.01)
    );
    border-radius: 22px;
    padding: 1.5rem;
    overflow: hidden;
  }

  .section-shell::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        circle at 25% 20%,
        rgba(103, 232, 249, 0.1),
        transparent 35%
      ),
      radial-gradient(
        circle at 80% 0%,
        rgba(167, 139, 250, 0.08),
        transparent 40%
      );
    pointer-events: none;
    opacity: 0.7;
  }

  .section-header {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .section-body {
    position: relative;
    z-index: 1;
    margin-top: 1rem;
  }

  .section-eyebrow {
    font-size: 0.8rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent-2);
  }

  .section-title {
    font-size: clamp(1.5rem, 2vw + 1rem, 2rem);
    font-weight: 800;
    color: var(--text-primary);
  }

  .section-description {
    color: var(--text-muted);
  }
</style>
