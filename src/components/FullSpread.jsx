import { forwardRef } from 'react';
import CompareSlider from './CompareSlider.jsx';
import Lightbox, { useLightbox } from './Lightbox.jsx';

const FullSpread = forwardRef(function FullSpread({ full, narrow }, ref) {
  const zoom = useLightbox();
  const L = full.L || [], R = full.R || [];
  const shots = [...L, ...R].map((g) => ({ src: g.src, alt: g.alt, cap: g.cap }));

  // On phones the halves stack as normal pages (positioned by CSS).
  const half = (side) => (narrow
    ? {}
    : { left: side === 'L' ? 0 : '50%', top: 0, width: '50%', height: '100%' });

  const renderHalf = (side) => {
    const items = side === 'L' ? L : R;
    const offset = side === 'L' ? 0 : L.length;
    const slots = full[`${side}slots`] || [];
    if (!items.length && !slots.length) return null;
    return (
      <div className="half" style={half(side)}>
        {items.map((g, j) => (
          <figure key={g.src} className="half__item">
            <div className="photo" style={{ background: g.bg, transform: `rotate(${g.rot})` }}>
              <button type="button" className="zoom" onClick={() => zoom.open(offset + j)} aria-label={`View larger: ${g.alt}`}>
                <img src={g.src} alt={g.alt} style={{ maxHeight: g.h || full.imgH }} className="half__img" loading="lazy" />
              </button>
              <span className="tape" style={{ left: '36%', width: '28%', transform: 'rotate(-3deg)' }} />
            </div>
            {g.cap && <figcaption className="hand half__cap">{g.cap}</figcaption>}
          </figure>
        ))}
        {slots.length > 0 && (
          <div className="slots">
            {slots.map((s) => (
              <div key={s.id} className="slot" style={{ transform: `rotate(${s.rot})` }}>
                <span className="tape" style={{ left: '32%', width: '36%', transform: 'rotate(-4deg)', zIndex: 2 }} />
                <div className="slot__frame">
                  {s.src ? <img src={s.src} alt={s.cap} className="cover-img" loading="lazy" /> : <span className="slot__empty">artwork coming soon</span>}
                </div>
                <div className="hand slot__cap">{s.cap}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={ref} className="full">
      {full.cap && <div className="mono full__cap">{full.cap}</div>}
      {full.slider && <CompareSlider title={full.title} before={full.before} after={full.after} />}
      {renderHalf('L')}
      {renderHalf('R')}
      {shots.length > 0 && <Lightbox items={shots} index={zoom.index} onClose={zoom.close} onChange={zoom.setIndex} />}
    </div>
  );
});

export default FullSpread;
