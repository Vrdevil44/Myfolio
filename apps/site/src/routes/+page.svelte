<script lang="ts">
  import Lenis from 'lenis';
  import { animate, spring } from 'motion';
  import { onMount } from 'svelte';

  import BlogPostPreview from '$lib/components/BlogPostPreview.svelte';
  import MiniGame from '$lib/components/MiniGame.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import Section from '$lib/components/Section.svelte';
  import SkillGraph from '$lib/components/SkillGraph.svelte';
  import TimelineItem from '$lib/components/TimelineItem.svelte';
  import type { Resume } from '$lib/types/resume';

  export let data: { resume: Resume };
  const { resume } = data;

  let score = 0;

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
    score += 10;
    const button = document.querySelector('.cta-level');
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

<div class="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-12 lg:gap-14 lg:px-8" id="hero">
  <section class="grid gap-8 rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6 shadow-xl lg:grid-cols-[1.4fr_1fr] lg:p-10">
    <div class="space-y-5">
      <p class="text-xs uppercase tracking-[0.3em] text-[color:var(--accent-2)]">Phase 2 · Base layout</p>
      <h1 class="text-4xl font-black leading-tight text-[color:var(--text-primary)] lg:text-5xl">
        Interactive, gamified portfolio for Vibhu Dikshit.
      </h1>
      <p class="max-w-2xl text-lg text-[color:var(--text-muted)]">
        {resume.summary}
      </p>
      <div class="flex flex-wrap items-center gap-3 text-sm text-[color:var(--text-muted)]">
        <span class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1">
          <span class="i-tabler-sparkles text-[color:var(--accent-2)]"></span>
          Dark-mode first
        </span>
        <span class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1">
          <span class="i-tabler-cube text-[color:var(--accent)]"></span>
          3D & micro-interactions
        </span>
        <span class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1">
          <span class="i-tabler-wand text-[color:var(--accent-2)]"></span>
          YAML-driven content
        </span>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <button
          class="cta-level inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-2)] px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:translate-y-[-2px]"
          on:click={levelUp}
        >
          Level up the experience
          <span class="i-tabler-bolt"></span>
        </button>
        <p class="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-primary)] px-4 py-2 text-xs font-semibold text-[color:var(--accent-2)]">
          <span class="spark i-tabler-planet"></span>
          Score {score} xp
        </p>
      </div>
    </div>
    <div class="grid gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-primary)]/60 p-4">
      <div class="flex items-center justify-between rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-4 py-3">
        <div class="text-sm text-[color:var(--text-muted)]">Theme ready · Uno palette</div>
        <span class="i-tabler-palette text-xl text-[color:var(--accent-2)]"></span>
      </div>
      <MiniGame />
      <div class="grid gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4">
        <div class="flex items-center justify-between text-sm text-[color:var(--text-primary)]">
          <span>Astro + SvelteKit synergy</span>
          <span class="i-tabler-topology-text text-[color:var(--accent-2)]"></span>
        </div>
        <p class="text-sm text-[color:var(--text-muted)]">Blog and docs exported as islands for /blog.</p>
      </div>
    </div>
  </section>

  <Section
    id="experience"
    eyebrow="Storyline"
    title="Experience timeline"
    description="Builds on YAML content piped through the SvelteKit layout load function."
  >
    <div class="grid gap-4 md:grid-cols-2">
      {#each resume.experience as item}
        <TimelineItem role={item.role} company={item.company} timeframe={item.timeframe} highlights={item.highlights ?? []} />
      {/each}
    </div>
  </Section>

  <Section
    id="projects"
    eyebrow="Playable showreel"
    title="Projects & experiments"
    description="Highlighting multi-framework interactions and future Qwik islands."
  >
    <div class="grid gap-4 md:grid-cols-2">
      {#each resume.projects as project}
        <ProjectCard name={project.name} description={project.description} />
      {/each}
    </div>
  </Section>

  <Section
    id="skills"
    eyebrow="Skill graph"
    title="Capabilities"
    description="Custom Uno palette, gradients, and variable typography tuned for dark mode."
  >
    <SkillGraph skills={resume.skills} />
  </Section>

  <Section
    id="blog"
    eyebrow="Astro hub"
    title="Docs & blog"
    description="Astro will compile Markdown/MDX for /blog, embeddable as islands or iframes into SvelteKit."
  >
    <div class="grid gap-4 md:grid-cols-2">
      <BlogPostPreview
        title="Designing a gamified hero with Threlte"
        description="How the 3D hero and Lenis smooth scrolling join forces for immersion."
        href="/blog/threlte-gamified-hero"
      />
      <BlogPostPreview
        title="Resumability with Qwik mini-games"
        description="Quick-loading mini game islands bundled alongside SvelteKit sections."
        href="/blog/qwik-mini-game"
      />
    </div>
  </Section>

  <Section id="contact" eyebrow="Contact" title="Collaborate" description="Reach out for immersive web builds.">
    <div class="grid gap-4 md:grid-cols-[2fr_1fr]">
      <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-5 text-[color:var(--text-muted)]">
        <p>
          Email <a class="text-[color:var(--accent-2)]" href="mailto:hello@example.com">hello@example.com</a> or connect
          on LinkedIn.
        </p>
        <p class="mt-2 text-sm">Footer icons persist for quick access across the site.</p>
      </div>
      <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-5">
        <p class="text-sm uppercase tracking-[0.2em] text-[color:var(--accent-2)]">References</p>
        <ul class="mt-2 space-y-2 text-sm text-[color:var(--text-muted)]">
          {#each resume.references as ref}
            <li class="flex items-center justify-between rounded-lg bg-[color:var(--bg-primary)]/60 px-3 py-2">
              <span>{ref.name}</span>
              <a class="text-[color:var(--accent-2)]" href={`mailto:${ref.contact}`}>Contact</a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </Section>
</div>
