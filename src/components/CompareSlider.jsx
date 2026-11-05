import { useRef, useState } from 'react';

export default function CompareSlider({ title, before, after }) {
  const [pos, setPos] = useState(50);
  const box = useRef(null);
  const dragging = useRef(false);

  const move = (e) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };

  const onKey = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.stopPropagation();
      e.preventDefault();
      setPos((p) => Math.max(0, Math.min(100, p + (e.key === 'ArrowLeft' ? -5 : 5))));
    }
  };

  return (
    <div className="slider-page">
      <div className="compare">
        <span className="tape" style={{ left: '8%', width: 110, transform: 'rotate(-3deg)', zIndex: 2 }} />
        <span className="tape" style={{ right: '8%', width: 110, transform: 'rotate(4deg)', zIndex: 2 }} />
        <div
          ref={box}
          className="compare__box"
          role="slider"
          tabIndex={0}
          aria-label={`${title}: before and after comparison`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% before`}
          onKeyDown={onKey}
          onPointerDown={(e) => { e.currentTarget.setPointerCapture?.(e.pointerId); dragging.current = true; move(e); }}
          onPointerMove={(e) => { if (dragging.current) move(e); }}
          onPointerUp={() => { dragging.current = false; }}
          onPointerCancel={() => { dragging.current = false; }}
        >
          <img src={after} alt={`${title} after the redesign`} draggable="false" className="compare__img" />
          <div className="compare__before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={before} alt={`${title} before the redesign`} draggable="false" className="compare__img" />
          </div>
          <div className="compare__handle" style={{ left: `${pos}%` }}><div className="compare__knob">⇆</div></div>
          <span className="compare__tag compare__tag--before">BEFORE</span>
          <span className="compare__tag compare__tag--after">AFTER</span>
        </div>
      </div>
      <div className="hand compare__hint">← drag to compare →</div>
    </div>
  );
}
