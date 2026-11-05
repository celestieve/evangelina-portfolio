import { forwardRef } from 'react';
import CompareSlider from './CompareSlider.jsx';
import Lightbox, { useLightbox } from './Lightbox.jsx';
import Img from './Img.jsx';

const FullSpread = forwardRef(function FullSpread({ full, narrow, label }, ref) {
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
    if (!items.length) return null;
    return (
      <div className="half" style={half(side)}>
        {items.map((g, j) => (
          <figure key={g.src} className="half__item">
            <div className="photo" style={{ background: g.bg, transform: `rotate(${g.rot})` }}>
              <button type="button" className="zoom" onClick={() => zoom.open(offset + j)} aria-label={`View larger: ${g.alt}`}>
                <Img src={g.src} alt={g.alt} style={{ maxHeight: g.h || full.imgH }} className="half__img" loading="lazy" />
              </button>
              <span className="tape" style={{ left: '36%', width: '28%', transform: 'rotate(-3deg)' }} />
            </div>
            {g.cap && <figcaption className="hand half__cap">{g.cap}</figcaption>}
          </figure>
        ))}
      </div>
    );
  };

  return (
    <section ref={ref} className="full" aria-label={label} tabIndex={-1}>
      {full.cap && <div className="mono full__cap">{full.cap}</div>}
      {full.slider && <CompareSlider title={full.title} before={full.before} after={full.after} />}
      {renderHalf('L')}
      {renderHalf('R')}
      {shots.length > 0 && <Lightbox items={shots} index={zoom.index} onClose={zoom.close} onChange={zoom.setIndex} />}
    </section>
  );
});

export default FullSpread;
