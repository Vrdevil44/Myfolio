<script lang="ts">
  export let title: string;
  export let description: string;
  export let href: string;
</script>

<article class="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4 transition hover:-translate-y-1 hover:border-[color:var(--accent-2)]">
  <div class="absolute inset-0 bg-gradient-to-r from-[color:var(--accent)]/10 via-transparent to-[color:var(--accent-2)]/15 opacity-0 transition duration-500 group-hover:opacity-100"></div>
  <div class="relative z-10 space-y-2">
    <h3 class="text-lg font-semibold text-[color:var(--text-primary)]">{title}</h3>
    <p class="text-sm text-[color:var(--text-muted)]">{description}</p>
    <a class="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-2)]" href={href}>
      Read case study
      <span class="i-tabler-arrow-right"></span>
    </a>
  </div>
</article>
