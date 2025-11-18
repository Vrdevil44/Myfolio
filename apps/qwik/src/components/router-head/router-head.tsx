import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';

export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title ?? 'Qwik Mini-game'}</title>
      <link rel="canonical" href={loc.url.href} />
      {head.meta.map((m) => (
        <meta key={`${m.name ?? m.property}-${m.content}`} {...m} />
      ))}
      {head.links.map((l) => (
        <link key={`${l.rel}-${l.href}`} {...l} />
      ))}
      {head.styles.map((s) => (
        <style key={s.key} {...s.props}>
          {s.style}
        </style>
      ))}
      {head.scripts.map((s) => (
        <script key={s.key} {...s.props}>
          {s.script}
        </script>
      ))}
    </>
  );
});
