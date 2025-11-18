<script lang="ts">
  export let skills: string[] = [];
</script>

<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
  {#each skills as skill, index}
    <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4">
      <div class="flex items-center justify-between text-sm font-semibold text-[color:var(--text-primary)]">
        <span>{skill}</span>
        <span class="text-[color:var(--accent-2)]">{Math.min(95, 65 + index * 4)}%</span>
      </div>
      <div class="mt-2 h-2 overflow-hidden rounded-full bg-[color:var(--bg-primary)]">
        <div
          class="h-full rounded-full bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-2)]"
          style={`width: ${Math.min(95, 65 + index * 4)}%;`}
        ></div>
      </div>
    </div>
  {/each}
</div>
