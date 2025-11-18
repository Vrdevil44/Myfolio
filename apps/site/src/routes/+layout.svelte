<script lang="ts">
  import '@fontsource-variable/manrope';
  import gsap from 'gsap';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import * as Tone from 'tone';

  const analyticsDomain =
    import.meta.env.VITE_PLAUSIBLE_DOMAIN ?? 'myfolio.example';
  const analyticsApiHost =
    import.meta.env.VITE_PLAUSIBLE_API ?? 'https://plausible.io';
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN ?? '';

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    {
      href: 'https://github.com',
      label: 'GitHub',
      icon: 'i-tabler-brand-github',
    },
    {
      href: 'https://linkedin.com',
      label: 'LinkedIn',
      icon: 'i-tabler-brand-linkedin',
    },
    { href: 'mailto:hello@example.com', label: 'Email', icon: 'i-tabler-mail' },
  ];

  let isMenuOpen = false;
  let theme: 'light' | 'dark' = 'dark';
  let drawerEl: HTMLDivElement | null = null;
  let synth: Tone.Synth | null = null;
  let audioReady = false;

  const playTone = async (note: string) => {
    if (!browser) return;
    if (!audioReady) {
      await Tone.start();
      synth = new Tone.Synth().toDestination();
      audioReady = true;
    }
    synth?.triggerAttackRelease(note, '16n');
  };

  const applyTheme = (value: 'light' | 'dark') => {
    if (!browser) return;
    const root = document.documentElement;
    root.classList.toggle('dark', value === 'dark');
    root.classList.toggle('light', value === 'light');
    localStorage.setItem('theme', value);
  };

  onMount(() => {
    if (!browser) return;
    const stored = localStorage.getItem('theme');
    const preferred =
      stored === 'light' || stored === 'dark'
        ? stored
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    theme = preferred;
    applyTheme(preferred);
  });

  $: if (browser) {
    applyTheme(theme);
    if (drawerEl) {
      gsap.to(drawerEl, {
        x: isMenuOpen ? 0 : '100%',
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  }

  const toggleMenu = async () => {
    isMenuOpen = !isMenuOpen;
    await playTone(isMenuOpen ? 'A4' : 'F4');
  };

  const closeMenu = () => {
    isMenuOpen = false;
  };
</script>

<svelte:head>
  <style>
    :global(body) {
      font-family:
        'Manrope Variable',
        system-ui,
        -apple-system,
        'Segoe UI',
        sans-serif;
      background:
        radial-gradient(
          circle at 10% 20%,
          rgba(120, 119, 198, 0.08),
          transparent 25%
        ),
        radial-gradient(
          circle at 90% 10%,
          rgba(56, 189, 248, 0.08),
          transparent 25%
        ),
        radial-gradient(
          circle at 20% 80%,
          rgba(74, 222, 128, 0.1),
          transparent 28%
        ),
        var(--bg-primary);
      color: var(--text-primary);
      transition:
        background 200ms ease,
        color 200ms ease;
    }

    :global(:root) {
      --bg-primary: #07090f;
      --bg-elevated: rgba(255, 255, 255, 0.04);
      --text-primary: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #7c3aed;
      --accent-2: #67e8f9;
      --border: rgba(255, 255, 255, 0.08);
    }

    :global(.dark) {
      --bg-primary: #05060d;
      --bg-elevated: rgba(255, 255, 255, 0.05);
      --text-primary: #e5e7eb;
      --text-muted: #94a3b8;
      --accent: #a78bfa;
      --accent-2: #4ade80;
      --border: rgba(255, 255, 255, 0.08);
    }

    :global(.light) {
      --bg-primary: #f8fafc;
      --bg-elevated: #ffffff;
      --text-primary: #0f172a;
      --text-muted: #475569;
      --accent: #7c3aed;
      --accent-2: #0ea5e9;
      --border: rgba(15, 23, 42, 0.08);
    }
  </style>

  {#if analyticsDomain}
    <script
      defer
      data-domain={analyticsDomain}
      data-api={`${analyticsApiHost}/api/event`}
      src={`${analyticsApiHost}/js/script.js`}
    ></script>
  {/if}

  {#if sentryDsn}
    <script
      src="https://browser.sentry-cdn.com/7.114.0/bundle.min.js"
      crossorigin="anonymous"
      data-dsn={sentryDsn}
      data-traces-sample-rate="0.2"
      defer
    ></script>
  {/if}
</svelte:head>

<div class="flex min-h-screen flex-col">
  <header
    class="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--bg-primary)]/80 backdrop-blur"
  >
    <div
      class="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 lg:px-8"
    >
      <a
        href="#hero"
        class="inline-flex items-center gap-2 text-lg font-semibold text-[color:var(--text-primary)]"
      >
        <span
          class="h-10 w-10 rounded-xl bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent-2)] shadow-lg shadow-[color:var(--accent)]/30"
        ></span>
        <span>Myfolio</span>
      </a>

      <nav
        class="hidden items-center gap-6 text-sm font-medium text-[color:var(--text-muted)] lg:flex"
      >
        {#each navLinks as link}
          <a
            class="hover:text-[color:var(--accent-2)] transition-colors"
            href={link.href}>{link.label}</a
          >
        {/each}
      </nav>

      <div class="flex items-center gap-3">
        <button
          class="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-3 py-2 text-sm font-semibold text-[color:var(--text-primary)] shadow-sm transition hover:border-[color:var(--accent-2)] hover:text-[color:var(--accent-2)]"
          aria-label="Toggle theme"
          aria-pressed={theme === 'dark'}
          on:click={async () => {
            theme = theme === 'dark' ? 'light' : 'dark';
            await playTone(theme === 'dark' ? 'E4' : 'C5');
          }}
        >
          <span
            class={theme === 'dark' ? 'i-tabler-moon' : 'i-tabler-sun'}
            aria-hidden="true"
          ></span>
          {theme === 'dark' ? 'Dark' : 'Light'}
        </button>

        <button
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)] text-[color:var(--text-primary)] transition hover:border-[color:var(--accent-2)] lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
          on:click={toggleMenu}
        >
          <span
            class={isMenuOpen ? 'i-tabler-x' : 'i-tabler-menu-2'}
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </div>

    <div
      class={`fixed inset-0 z-30 lg:hidden ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      role="button"
      tabindex="0"
      aria-label="Close navigation menu"
      on:click|self={closeMenu}
      on:keydown={(event) => event.key === 'Escape' && closeMenu()}
    >
      <div
        class={`absolute inset-0 bg-black/50 transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
      ></div>
      <div
        bind:this={drawerEl}
        id="mobile-nav"
        class="absolute right-0 top-0 flex h-full w-72 flex-col gap-6 bg-[color:var(--bg-primary)] px-6 py-8 shadow-2xl"
        role="dialog"
        aria-label="Mobile navigation"
        tabindex="-1"
      >
        <div class="flex items-center justify-between">
          <span class="text-lg font-semibold text-[color:var(--text-primary)]"
            >Navigate</span
          >
          <button
            class="text-[color:var(--text-muted)]"
            on:click={closeMenu}
            aria-label="Close navigation"
          >
            <span class="i-tabler-x"></span>
          </button>
        </div>
        <div class="flex flex-col gap-4 text-[color:var(--text-primary)]">
          {#each navLinks as link}
            <a
              class="rounded-lg px-3 py-2 hover:bg-[color:var(--bg-elevated)]"
              href={link.href}
              on:click={closeMenu}
            >
              {link.label}
            </a>
          {/each}
        </div>
        <div class="mt-auto flex gap-3 text-xl text-[color:var(--text-muted)]">
          {#each socialLinks as social}
            <a
              href={social.href}
              aria-label={social.label}
              class="hover:text-[color:var(--accent-2)]"
            >
              <span class={social.icon}></span>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <footer
    class="border-t border-[color:var(--border)] bg-[color:var(--bg-primary)]/90"
  >
    <div
      class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8"
    >
      <div
        class="flex items-center gap-2 text-sm text-[color:var(--text-muted)]"
      >
        <span class="i-tabler-sparkles text-[color:var(--accent-2)]"></span>
        <span>Crafted for Vibhu Dikshit · Myfolio</span>
      </div>
      <div class="flex items-center gap-4 text-[color:var(--text-muted)]">
        {#each socialLinks as social}
          <a
            href={social.href}
            aria-label={social.label}
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)] text-lg transition hover:border-[color:var(--accent-2)] hover:text-[color:var(--accent-2)]"
          >
            <span class={social.icon}></span>
          </a>
        {/each}
      </div>
      <p class="text-sm text-[color:var(--text-muted)]">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </div>
  </footer>
</div>
