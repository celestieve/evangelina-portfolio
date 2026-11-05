import { CASES, SITE } from '../data.js';

export default function LeftPage({ lp }) {
  if (lp.toc) return <Contents />;
  if (lp.intro) return <CaseIntro lp={lp} />;
  if (lp.studioIntro) return <StudioIntro />;
  if (lp.aboutL) return <AboutLeft />;
  return null;
}

function Contents() {
  return (
    <div className="stack">
      <div className="hand hand--label">contents</div>
      <h1 className="toc__title">Hi, I'm <span className="sage">Evangelina.</span></h1>
      <p className="toc__lede">UX/UI designer and design engineer at VitalEngine, building tools for doctors and nurses.</p>
      <div className="toc__head mono"><span>product work</span><span>VitalEngine · 2026</span></div>
      {CASES.map((c) => (
        <a key={c.id} href={c.href} className="toc__row">
          <span className="mono">{c.num}</span>
          <span className="toc__name">
            <span className="toc__case">{c.title}</span>
            <span className="toc__outcome">{c.outcome}</span>
          </span>
          <span className="mono toc__status">{c.statusShort}</span>
        </a>
      ))}
    </div>
  );
}

function CaseIntro({ lp }) {
  return (
    <div className="stack stack--gap">
      <h1 className="case__title">{lp.title}</h1>
      <div className="hand case__sub">{lp.sub}</div>
      <div className="result-tag">
        <span className="mono">the result</span>
        <span className="result-tag__value">{lp.outcome}</span>
      </div>
      <p className="case__overview">{lp.overview}</p>
      <div className="meta">
        {lp.meta.map((m) => (
          <div key={m.k} className="meta__row"><span className="mono">{m.k}</span><span>{m.v}</span></div>
        ))}
      </div>
    </div>
  );
}

function StudioIntro() {
  return (
    <div className="stack stack--gap-lg">
      <div className="mono">Creative Director · Vietnamese Student Association, UAB · 2022–2025</div>
      <h1 className="studio__title">Lotus Under <span className="sage">the Lights</span></h1>
      <p className="case__overview">Brand identity, social campaigns and merch for UAB's largest annual cultural show, two years in a row. Every performer and committee got their own reveal graphic.</p>
      <div className="stats">
        {[['+32%', 'merch sales'], ['+40%', 'pre-event engagement'], ['300+', 'attendees']].map(([n, l]) => (
          <div key={l}><div className="stats__num">{n}</div><div className="mono">{l}</div></div>
        ))}
      </div>
    </div>
  );
}

function AboutLeft() {
  return (
    <div className="stack stack--gap-lg">
      <div className="hand hand--label">about me</div>
      <h1 className="about__title">I design it, <span className="sage">then help build it.</span></h1>
      <p className="case__overview" style={{ maxWidth: '40ch' }}>I'm Evangelina, a recent UAB graduate and UX Designer &amp; Frontend Developer at VitalEngine, where I design clinical tools for physicians, nurses and care teams.</p>
      <p className="about__body">Most of my projects start with watching how a team actually works. Then I prototype in real code and stay through code review, so the final product looks like what we designed. In college I was creative director for the Vietnamese Student Association for three years. That's where I learned to sweat the visual details.</p>
      <div className="hand about__aside">off the clock: plants, stars &amp; art</div>
      <div className="pills">
        <a href={`mailto:${SITE.email}`} className="pill pill--solid">{SITE.email}</a>
        <a href={SITE.resume} target="_blank" rel="noreferrer" className="pill">Resume ↗</a>
        {SITE.linkedin && <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="pill">LinkedIn ↗</a>}
        {SITE.github && <a href={SITE.github} target="_blank" rel="noreferrer" className="pill">GitHub ↗</a>}
      </div>
    </div>
  );
}
