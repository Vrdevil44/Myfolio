<script lang="ts">
  import type { ResumeSkillCategory } from '$lib/types/resume';

  export let skills: ResumeSkillCategory[] = [];
</script>

<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
  {#each skills as skill, index}
    <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4 transition hover:-translate-y-1 hover:border-[color:var(--accent-2)]">
      <div class="flex items-center justify-between text-sm font-semibold text-[color:var(--text-primary)]">
        <span>{skill.name}</span>
        <span class="text-[color:var(--accent-2)]">{Math.round((skill.intensity ?? 0.5) * 100)}%</span>
      </div>
      <div class="mt-2 h-2 overflow-hidden rounded-full bg-[color:var(--bg-primary)]">
        <div
          class="h-full rounded-full bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-2)]"
          style={`width: ${Math.min(100, ((skill.intensity ?? 0.5) + index * 0.05) * 100)}%;`}
        ></div>
      </div>
      <p class="mt-2 text-xs text-[color:var(--text-muted)]">{skill.tools.join(' · ')}</p>
    </div>
  {/each}
</div>
