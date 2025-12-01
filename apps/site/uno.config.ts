import { defineConfig, presetIcons, presetUno, presetWebFonts } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      brand: {
        primary: '#7c3aed',
        secondary: '#67e8f9',
        accent: '#4ade80',
      },
      surface: {
        base: '#07090f',
        elevated: 'rgba(255, 255, 255, 0.05)',
      },
    },
    fontFamily: {
      sans: '"Manrope Variable", system-ui, -apple-system, "Segoe UI", sans-serif',
    },
  },
  shortcuts: {
    'card-shell':
      'rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] shadow-lg shadow-[color:var(--accent)]/10',
    'pill-muted':
      'inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1 text-[color:var(--text-muted)]',
  },
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Manrope:400,500,600,700,800',
        mono: 'Fira Code',
      },
    }),
  ],
});
