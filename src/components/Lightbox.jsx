import { useEffect, useRef, useState } from 'react';

// Full-size image viewer. Uses a native modal <dialog>, which handles the focus
// trap, Esc to close and hiding the page behind it from screen readers.
export default function Lightbox({ items, index, onClose, onChange }) {
  const ref = useRef(null);
  const open = index != null;
  const item = open ? items[index] : null;
  const many = items.length > 1;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const step = (dir) => onChange((index + dir + items.length) % items.length);

  const onKey = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    // Keep the book from turning its page underneath the viewer
    e.stopPropagation();
    e.preventDefault();
    if (many) step(e.key === 'ArrowLeft' ? -1 : 1);
  };

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={item ? item.alt : 'Image viewer'}
      onClose={onClose}
      onKeyDown={onKey}
      // A click on the backdrop (the dialog itself, not its contents) closes it
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {item && (
        <>
          <figure className="lightbox__fig">
            <img src={item.src} alt={item.alt} className="lightbox__img" />
            {(item.cap || many) && (
              <figcaption className="lightbox__cap">
                {item.cap && <span className="hand lightbox__title">{item.cap}</span>}
                {many && <span className="mono lightbox__count">{index + 1} / {items.length}</span>}
              </figcaption>
            )}
          </figure>
          <button type="button" className="lightbox__btn lightbox__close mono" onClick={onClose} autoFocus>close ✕</button>
          {many && (
            <>
              <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Previous image">←</button>
              <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Next image">→</button>
            </>
          )}
        </>
      )}
    </dialog>
  );
}

// Open/close state for a group of zoomable images.
export function useLightbox() {
  const [index, setIndex] = useState(null);
  return { index, open: setIndex, close: () => setIndex(null), setIndex };
}
