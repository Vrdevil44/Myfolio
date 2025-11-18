<script lang="ts">
  import Lenis from 'lenis';
  import { animate, spring } from 'motion';
  import { onMount } from 'svelte';

  import BlogPostPreview from '$lib/components/BlogPostPreview.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import Section from '$lib/components/Section.svelte';
  import TimelineItem from '$lib/components/TimelineItem.svelte';
  import type { Resume, ResumeProject } from '$lib/types/resume';

  type SkillOrbitComponentType = typeof import('$lib/components/SkillOrbit.svelte').default;
  type SkillGraphComponentType = typeof import('$lib/components/SkillGraph.svelte').default;
  type RiveSignatureComponentType = typeof import('$lib/components/RiveSignature.svelte').default;

  export let data: { resume: Resume };
  const { resume } = data;

  let score = 0;
  let particleCanvas: HTMLDivElement | null = null;
  let particleSketch: import('p5').default | null = null;
  let focusedRole = '';
  let selectedFilter = 'All';
  let selectedProject: ResumeProject | null = null;
  let prefersReducedMotion = false;
  let lenis: Lenis | null = null;
  let skillsSection: HTMLElement | null = null;
  let reduceMotionQuery: MediaQueryList | null = null;
  let scrollRaf: number | null = null;
  let SkillOrbitComponent: SkillOrbitComponentType | null = null;
  let SkillGraphComponent: SkillGraphComponentType | null = null;
  let RiveSignatureComponent: RiveSignatureComponentType | null = null;
  let sparkAnimation: ReturnType<typeof animate> | null = null;

  const filters = ['All', ...new Set(resume.projects.flatMap((p) => p.tags ?? []) || [])];
  const structuredData = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Vibhu Dikshit',
      description: resume.summary,
      jobTitle: resume.tagline,
      url: 'https://myfolio.example.com',
      sameAs: ['https://github.com', 'https://linkedin.com'],
      worksFor: {
        '@type': 'Organization',
        name: 'Myfolio'
      },
      hasOccupation: (resume.experience ?? []).map((experience) => ({
        '@type': 'Occupation',
        name: experience.role,
        description: experience.highlights?.join(' '),
        startDate: experience.timeframe
      })),
      hasPart: (resume.projects ?? []).map((project) => ({
        '@type': 'CreativeWork',
        headline: project.name,
        abstract: project.description,
        genre: project.tags,
        url: project.links?.find((link) => link.label?.toLowerCase().includes('live'))?.url
      }))
    },
    null,
    2
  );

  const loadSkills = async () => {
    if (SkillOrbitComponent && SkillGraphComponent) return;
    const [orbitModule, graphModule] = await Promise.all([
      import('$lib/components/SkillOrbit.svelte'),
      import('$lib/components/SkillGraph.svelte')
    ]);
    SkillOrbitComponent = orbitModule.default;
    SkillGraphComponent = graphModule.default;
  };

  const loadSignature = async () => {
    if (RiveSignatureComponent) return;
    const module = await import('$lib/components/RiveSignature.svelte');
    RiveSignatureComponent = module.default;
  };

  const startParticles = async () => {
    if (prefersReducedMotion || !particleCanvas) return;
    const { default: P5 } = await import('p5');
    particleSketch = new P5((s) => {
      const dots: { x: number; y: number; z: number; vx: number; vy: number }[] = [];

      s.setup = () => {
        s.createCanvas(particleCanvas?.clientWidth ?? 600, 360, s.WEBGL).parent(particleCanvas!);
        for (let i = 0; i < 120; i++) {
          dots.push({
            x: s.random(-200, 200),
            y: s.random(-120, 120),
            z: s.random(-160, 160),
            vx: s.random(-0.4, 0.4),
            vy: s.random(-0.4, 0.4)
          });
        }
      };

      s.windowResized = () => {
        s.resizeCanvas(particleCanvas?.clientWidth ?? 600, 360);
      };

      s.draw = () => {
        s.background(8, 10, 18, 90);
        s.rotateY(s.millis() * 0.0002);
        dots.forEach((d) => {
          d.x += d.vx;
          d.y += d.vy;
          if (Math.abs(d.x) > 200) d.vx *= -1;
          if (Math.abs(d.y) > 140) d.vy *= -1;
          s.push();
          s.translate(d.x, d.y, d.z);
          s.stroke(103, 232, 249, 180);
          s.strokeWeight(2);
          s.point(0, 0, 0);
          s.pop();
        });
      };
    });
  };

  const startLenis = () => {
    if (prefersReducedMotion || lenis) return;
    lenis = new Lenis();
    const loop = (time: number) => {
      lenis?.raf(time);
      scrollRaf = requestAnimationFrame(loop);
    };

    scrollRaf = requestAnimationFrame(loop);
  };

  const startSparkAnimation = () => {
    if (prefersReducedMotion || sparkAnimation) return;
    sparkAnimation = animate('.spark', { opacity: [0, 1, 0] }, { duration: 2, repeat: Infinity });
  };

  onMount(() => {
    reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreference = () => {
      prefersReducedMotion = reduceMotionQuery?.matches ?? false;
      if (prefersReducedMotion) {
        if (scrollRaf) cancelAnimationFrame(scrollRaf);
        lenis?.destroy();
        lenis = null;
        sparkAnimation?.stop();
        sparkAnimation = null;
        particleSketch?.remove();
        particleSketch = null;
        scrollRaf = null;
      } else {
        startLenis();
        startSparkAnimation();
        void startParticles();
      }
    };

    handleMotionPreference();
    reduceMotionQuery?.addEventListener('change', handleMotionPreference);

    startLenis();
    startSparkAnimation();
    void startParticles();
    void loadSignature();

    const skillsObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadSkills();
          skillsObserver.disconnect();
        }
      },
      { rootMargin: '120px' }
    );

    if (skillsSection) {
      skillsObserver.observe(skillsSection);
    }

    return () => {
      reduceMotionQuery?.removeEventListener('change', handleMotionPreference);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      lenis?.destroy();
      particleSketch?.remove();
      sparkAnimation?.stop();
      skillsObserver.disconnect();
    };
  });

  const levelUp = () => {
    score += 10;
    const button = document.querySelector('.cta-level');
    if (button && !prefersReducedMotion) {
      animate(
        button,
        { scale: [1, 1.05, 1] },
        { easing: spring({ stiffness: 400, damping: 20 }), duration: 0.35 }
      );
    }
  };

  const filteredProjects = () =>
    selectedFilter === 'All'
      ? resume.projects
      : resume.projects.filter((project) => (project.tags ?? []).includes(selectedFilter));

  const openProject = (project: ResumeProject) => {
    selectedProject = project;
  };

  const closeProject = () => {
    selectedProject = null;
  };
</script>

  <svelte:head>
    <title>Myfolio · Vibhu Dikshit</title>
    <meta
      name="description"
      content="Interactive, gamified portfolio built with SvelteKit, immersive motion, and YAML-driven content."
    />
    <meta name="keywords" content="Vibhu Dikshit, portfolio, SvelteKit, 3D web, IT specialist" />
    <meta property="og:title" content="Myfolio · Vibhu Dikshit" />
    <meta
      property="og:description"
      content="Explore Vibhu Dikshit's interactive portfolio with 3D skills, projects, and gamified touches."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://myfolio.example.com" />
    <meta property="og:image" content="https://myfolio.example.com/og.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Myfolio · Vibhu Dikshit" />
    <meta
      name="twitter:description"
      content="Interactive, gamified portfolio built with SvelteKit, immersive motion, and YAML-driven content."
    />
    <script type="application/ld+json">
      {structuredData}
    </script>
  </svelte:head>

<div class="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-12 lg:gap-14 lg:px-8" id="hero">
  <section class="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6 shadow-xl lg:grid lg:grid-cols-[1.4fr_1fr] lg:p-10">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(103,232,249,0.12),transparent_25%)]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(124,58,237,0.12),transparent_25%)]"></div>
    <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[color:var(--bg-primary)] to-transparent"></div>
    <div class="relative space-y-6">
      <p class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-primary)]/70 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[color:var(--accent-2)]">
        {resume.tagline}
        <span class="spark i-tabler-planet"></span>
      </p>
      <h1 class="text-4xl font-black leading-tight text-[color:var(--text-primary)] lg:text-5xl">
        Infrastructure-first IT Specialist – turning messy networks into measurable systems.
      </h1>
      <p class="max-w-2xl text-lg text-[color:var(--text-muted)]">{resume.summary}</p>
      <div class="flex flex-wrap items-center gap-3 text-sm text-[color:var(--text-muted)]">
        <span class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1">
          <span class="i-tabler-sparkles text-[color:var(--accent-2)]"></span>
          Animated hero & particles
        </span>
        <span class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1">
          <span class="i-tabler-cube text-[color:var(--accent)]"></span>
          3D skills orbit
        </span>
        <span class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1">
          <span class="i-tabler-wand text-[color:var(--accent-2)]"></span>
          YAML-driven content
        </span>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <button
          class="cta-level inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-2)] px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-1"
          on:click={levelUp}
        >
          View projects
          <span class="i-tabler-bolt"></span>
        </button>
        <button
          class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-primary)] px-5 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:-translate-y-1"
          on:click={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Contact
          <span class="i-tabler-mail"></span>
        </button>
        <p class="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-primary)] px-4 py-2 text-xs font-semibold text-[color:var(--accent-2)]">
          <span class="spark i-tabler-planet"></span>
          Score {score} xp
        </p>
      </div>
    </div>
    <div class="relative mt-6 grid gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-primary)]/70 p-4 lg:mt-0">
      <div class="relative overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-4 py-3">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(103,232,249,0.18),transparent_35%)]"></div>
        <div class="relative text-sm text-[color:var(--text-muted)]">Hero particles via p5.js · GSAP micro-interactions</div>
      </div>
      <div class="relative rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4">
        <div bind:this={particleCanvas} class="h-60 w-full"></div>
      </div>
      <div class="grid gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4">
        <div class="flex items-center justify-between text-sm text-[color:var(--text-primary)]">
          <span>Astro + SvelteKit synergy</span>
          <span class="i-tabler-topology-text text-[color:var(--accent-2)]"></span>
        </div>
        <p class="text-sm text-[color:var(--text-muted)]">Blog and docs exported as islands for /blog.</p>
        {#if RiveSignatureComponent}
          <svelte:component this={RiveSignatureComponent} />
        {:else}
          <p class="text-xs text-[color:var(--text-muted)]" role="status">Loading signature...</p>
        {/if}
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
        <TimelineItem
          role={item.role}
          company={item.company}
          timeframe={item.timeframe}
          highlights={item.highlights ?? []}
          location={item.location}
          icon={item.icon ?? 'i-tabler-briefcase'}
          on:focus={() => (focusedRole = item.role)}
        />
      {/each}
    </div>
    {#if focusedRole}
      <p class="mt-4 text-sm text-[color:var(--text-muted)]">Hovering: {focusedRole}</p>
    {/if}
  </Section>

  <Section
    id="projects"
    eyebrow="Playable showreel"
    title="Projects & experiments"
    description="Filterable gallery that opens modal deep-dives per project."
  >
    <div class="flex flex-wrap gap-3">
      {#each filters as filter}
        <button
          class={`rounded-full border px-3 py-1 text-xs transition ${
            selectedFilter === filter
              ? 'border-[color:var(--accent-2)] bg-[color:var(--bg-elevated)] text-[color:var(--accent-2)]'
              : 'border-[color:var(--border)] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]'
          }`}
          on:click={() => (selectedFilter = filter)}
          aria-pressed={selectedFilter === filter}
          aria-label={`Filter projects by ${filter}`}
        >
          {filter}
        </button>
      {/each}
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      {#each filteredProjects() as project, index}
        <div
          class="group cursor-pointer"
          on:click={() => openProject(project)}
          on:keypress={(event) => event.key === 'Enter' && openProject(project)}
          tabindex="0"
        >
          <ProjectCard name={project.name} description={project.description} />
          <div class="mt-2 flex flex-wrap gap-2 text-xs text-[color:var(--text-muted)]">
            {#each project.tags ?? [] as tag}
              <span class="rounded-full border border-[color:var(--border)] px-2 py-1">{tag}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </Section>

  {#if selectedProject}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
      role="dialog"
      aria-label="Project details"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div class="w-full max-w-2xl rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-primary)] p-6 shadow-2xl">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-[color:var(--accent-2)]">{selectedProject.category}</p>
            <h3 id="project-modal-title" class="text-2xl font-bold text-[color:var(--text-primary)]">{selectedProject.name}</h3>
          </div>
          <button
            class="rounded-full border border-[color:var(--border)] px-3 py-1 text-sm text-[color:var(--text-muted)]"
            on:click={closeProject}
            aria-label="Close project"
          >
            Close
          </button>
        </div>
        <p class="mt-3 text-[color:var(--text-muted)]">{selectedProject.description}</p>
        {#if selectedProject.tags?.length}
          <div class="mt-3 flex flex-wrap gap-2 text-xs text-[color:var(--text-muted)]">
            {#each selectedProject.tags as tag}
              <span class="rounded-full border border-[color:var(--border)] px-2 py-1">{tag}</span>
            {/each}
          </div>
        {/if}
        {#if selectedProject.links?.length}
          <div class="mt-4 flex flex-wrap gap-3 text-sm">
            {#each selectedProject.links as link}
              <a
                class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-2 text-[color:var(--accent-2)] hover:border-[color:var(--accent-2)]"
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <span class="i-tabler-external-link"></span>
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}

  <Section
    id="skills"
    eyebrow="Skill graph"
    title="Capabilities"
    description="Custom Uno palette, gradients, 3D orbit, and accessible fallback for dark mode."
  >
    <div class="space-y-4" bind:this={skillsSection}>
      {#if SkillOrbitComponent}
        <svelte:component this={SkillOrbitComponent} skills={resume.skills} />
      {:else}
        <p class="text-sm text-[color:var(--text-muted)]" role="status">
          Loading interactive orbit… here is the accessible list while you wait.
        </p>
      {/if}
      <div class="mt-4">
        {#if SkillGraphComponent}
          <svelte:component this={SkillGraphComponent} skills={resume.skills} />
        {:else}
          <ul class="grid gap-3 text-sm text-[color:var(--text-primary)] sm:grid-cols-2 lg:grid-cols-3">
            {#each resume.skills as skill}
              <li class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4">
                <div class="flex items-center justify-between font-semibold">
                  <span>{skill.name}</span>
                  <span class="text-[color:var(--accent-2)]">{Math.round((skill.intensity ?? 0.5) * 100)}%</span>
                </div>
                <p class="mt-2 text-xs text-[color:var(--text-muted)]">{skill.tools.join(' · ')}</p>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </Section>

  <Section
    id="blog"
    eyebrow="Astro hub"
    title="Docs & blog"
    description="Astro compiles Markdown/MDX for /blog, embeddable as islands or iframes into SvelteKit."
  >
    <div class="grid gap-4 md:grid-cols-2">
      {#if resume.blog?.length}
        {#each resume.blog as post}
          <BlogPostPreview title={post.title} description={post.summary} href={post.href} />
        {/each}
      {:else}
        <BlogPostPreview
          title="Designing a gamified hero with Threlte"
          description="How the 3D hero and Lenis smooth scrolling join forces for immersion."
          href="/blog/threlte-gamified-hero"
        />
      {/if}
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
