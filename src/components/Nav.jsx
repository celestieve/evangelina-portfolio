import { SITE } from '../data.js';

const TABS = [
  { href: '#/', label: 'contents', bg: 'rgba(199,184,224,.9)', r: '-2deg' },
  { href: '#/studio', label: 'graphics', bg: 'rgba(181,199,163,.9)', r: '1.5deg' },
  { href: '#/about', label: 'about', bg: 'rgba(233,213,170,.9)', r: '-1deg' },
  { href: SITE.resume, label: 'resume ↗', bg: 'rgba(230,201,210,.9)', r: '2deg', external: true },
  { href: `mailto:${SITE.email}`, label: 'say hi', bg: 'rgba(199,184,224,.9)', r: '-1.5deg' },
];

export default function Nav({ visible, inCase, progress, nextProject, prev, next }) {
  return (
    <div className="nav-layer" style={{ opacity: visible ? 1 : 0 }} inert={visible ? undefined : ''}>
      <header className="topbar">
        <a href="#/" className="brand">{SITE.name}</a>
        {inCase && <span className="mono topbar__progress">{progress}</span>}
        <nav className="tabs" aria-label="Main">
          {TABS.map((t) => (
            <a key={t.label} href={t.href} className="tab" style={{ background: t.bg, '--r': t.r }}
              {...(t.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{t.label}</a>
          ))}
        </nav>
      </header>
      {inCase && nextProject && <a href={nextProject.href} className="mono next-project">{nextProject.label}</a>}
      {prev && <a href={prev.href} className="hand turn turn--prev">{prev.label}</a>}
      {next && <a href={next.href} className="hand turn turn--next">{next.label}</a>}
    </div>
  );
}
