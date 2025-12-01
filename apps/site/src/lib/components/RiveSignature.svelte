<script lang="ts">
  export let label = 'Network cable flourish';
</script>

<div
  class="flex items-center gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-3"
>
  <img
    src="/signature.png"
    alt="Signature"
    class="h-20 w-[120px] rounded-lg bg-[color:var(--bg-primary)] object-cover"
  />
  <div>
    <p class="text-sm font-semibold text-[color:var(--text-primary)]">
      {label}
    </p>
    <p class="text-xs text-[color:var(--text-muted)]">
      Static signature for Phase 1.
    </p>
  </div>
</div>
