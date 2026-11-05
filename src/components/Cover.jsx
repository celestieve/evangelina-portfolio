const STARS = [
  { l: '20%', t: '18%', s: 8 }, { l: '72%', t: '26%', s: 6 }, { l: '26%', t: '74%', s: 6 }, { l: '70%', t: '78%', s: 9 },
];
const DOTS = [['60%', '15%'], ['16%', '48%'], ['80%', '56%'], ['42%', '84%']];

export default function Cover({ opened }) {
  return (
    <div className="cover" aria-hidden={opened}>
      <div className="cover__front">
        <span className="cover__rule" />
        <span className="cover__rule cover__rule--inner" />
        {STARS.map((s, i) => <span key={i} className="cover__star" style={{ left: s.l, top: s.t, width: s.s, height: s.s }} />)}
        {DOTS.map(([l, t], i) => <span key={i} className="cover__dot" style={{ left: l, top: t }} />)}
        <span className="cover__band" />
        <div className="cover__title">
          <div className="cover__moon" />
          <div className="cover__name">evangelina le</div>
          <span className="cover__line" />
          <div className="cover__sub">SKETCHBOOK · NO. 07</div>
        </div>
      </div>
      <div className="cover__back" />
    </div>
  );
}
