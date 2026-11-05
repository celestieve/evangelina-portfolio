import { asset, EXPERIENCE, SKILLS } from '../data.js';
import Lightbox, { useLightbox } from './Lightbox.jsx';
import Img from './Img.jsx';

export default function RightPage({ rp }) {
  if (rp.collage) return <Collage />;
  if (rp.probsol) return <ProblemSolution rp={rp} />;
  if (rp.shot) return <Shot rp={rp} />;
  if (rp.aboutR) return <AboutRight />;
  return null;
}

function Collage() {
  return (
    <>
      <a href="#/work/vtask" className="collage__card" style={{ left: '8%', top: '9%', width: '60%', '--r': '-2deg', '--rh': '-1deg' }}>
        <div className="collage__img" style={{ aspectRatio: '16/10' }}><Img src={asset('vtask-3.webp')} sizes="(max-width: 760px) 80vw, 30vw" alt="VTask redesign" style={{ objectPosition: 'left top' }} /></div>
        <span className="tape" style={{ left: '36%', width: '28%', transform: 'rotate(3deg)' }} />
      </a>
      <a href="#/work/vtask" className="hand collage__note" style={{ left: '71%', top: '17%', width: '26%', transform: 'rotate(5deg)' }}>VTask, now live ✓</a>
      <a href="#/work/onboarding" className="collage__card" style={{ left: '34%', top: '40%', width: '58%', '--r': '2deg', '--rh': '1deg' }}>
        <div className="collage__img" style={{ aspectRatio: '16/10' }}><Img src={asset('onboarding-5.webp')} sizes="(max-width: 760px) 80vw, 30vw" alt="Onboarding redesign" style={{ objectPosition: 'center top' }} /></div>
        <span className="tape" style={{ left: '18%', width: '30%', transform: 'rotate(-5deg)' }} />
      </a>
      <a href="#/work/onboarding" className="hand collage__note" style={{ left: '5%', top: '46%', width: '27%', transform: 'rotate(-4deg)' }}>onboarding: 12 fields → 4</a>
      <a href="#/studio" className="collage__card collage__card--dark" style={{ left: '8%', top: '66%', width: '32%', '--r': '-4deg', '--rh': '-2deg' }}>
        <div className="collage__img" style={{ aspectRatio: '1/1' }}><Img src={asset('vsa-2.webp')} sizes="(max-width: 760px) 40vw, 16vw" alt="Lotus Under the Lights graphic" style={{ objectPosition: 'center 30%' }} /></div>
      </a>
      <a href="#/studio" className="hand collage__note" style={{ left: '46%', top: '74%', width: '34%', transform: 'rotate(-2deg)' }}>posters, for fun →</a>
    </>
  );
}

function ListBlock({ title, items, tone }) {
  return (
    <div>
      <div className={`hand list__title list__title--${tone}`}>{title}</div>
      {items.map((p) => (
        <div key={p.h} className="list__item">
          <div className="list__h">{p.h}</div>
          <div className="list__t">{p.t}</div>
        </div>
      ))}
    </div>
  );
}

function ProblemSolution({ rp }) {
  return (
    <div className="stack stack--gap-lg">
      <ListBlock title="the problem" items={rp.problems} tone="ink" />
      <ListBlock title="what I designed" items={rp.solutions} tone="sage" />
    </div>
  );
}

function Shot({ rp }) {
  const zoom = useLightbox();
  return (
    <div className="shot">
      <div className="photo" style={{ background: rp.bg, transform: `rotate(${rp.rot})`, padding: '1.4cqh' }}>
        <button type="button" className="zoom" onClick={() => zoom.open(0)} aria-label={`View larger: ${rp.alt}`}>
          <Img src={rp.src} alt={rp.alt} className="shot__img" />
        </button>
        <span className="tape" style={{ left: '38%', width: '24%', transform: 'rotate(3deg)' }} />
      </div>
      <div className="hand shot__cap">{rp.cap}</div>
      <Lightbox items={[{ src: rp.src, alt: rp.alt, cap: rp.cap }]} index={zoom.index} onClose={zoom.close} onChange={zoom.setIndex} />
    </div>
  );
}

function AboutRight() {
  return (
    <div className="stack stack--gap-lg">
      <div className="portrait">
        <span className="tape" style={{ left: '30%', width: '40%', transform: 'rotate(3deg)', zIndex: 2 }} />
        <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
          <Img src={asset('portrait.webp')} alt="Evangelina Le" className="cover-img" />
        </div>
        <div className="hand portrait__cap">me, probably near a plant</div>
      </div>
      <div>
        <div className="hand list__title list__title--ink" style={{ paddingBottom: '.6cqh' }}>experience</div>
        {EXPERIENCE.map((e) => (
          <div key={e.org} className="exp">
            <span className="exp__org">{e.org}</span>
            <span className="mono">{e.when}</span>
            <span className="exp__role">{e.role}</span>
          </div>
        ))}
      </div>
      <div>
        <div className="hand list__title list__title--plain">toolkit</div>
        <div className="chips">{SKILLS.map((s) => <span key={s} className="chip">{s}</span>)}</div>
      </div>
    </div>
  );
}
