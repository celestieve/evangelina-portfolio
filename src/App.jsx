import { useCallback, useEffect, useRef, useState } from 'react';
import { SPREADS } from './data.js';
import LeftPage from './components/LeftPage.jsx';
import RightPage from './components/RightPage.jsx';
import FullSpread from './components/FullSpread.jsx';
import Cover from './components/Cover.jsx';
import Nav from './components/Nav.jsx';
import { useMediaQuery, usePrefersReducedMotion } from './hooks.js';

const BOOK_KEY = 'evangelina-book-opened';
// Set to false to skip the cover animation for returning visitors.
const ALWAYS_INTRO = true;

const readRoute = () => window.location.hash.replace(/^#\/?/, '');
const go = (n) => { window.location.hash = '#/' + SPREADS[n].key; };

export default function App() {
  const narrow = useMediaQuery('(max-width: 760px), (max-width: 1100px) and (orientation: portrait)');
  const reduced = usePrefersReducedMotion();
  const [route, setRoute] = useState(readRoute);

  // Intro state: opened (cover flipping/flipped), settled (animation done), instant (no transition)
  const [book, setBook] = useState(() => {
    let seen = null;
    try { seen = localStorage.getItem(BOOK_KEY); } catch { /* storage blocked */ }
    const skip = reduced || readRoute() !== '' || (seen && !ALWAYS_INTRO);
    return { opened: !!skip, settled: !!skip, instant: !!skip };
  });
  const timer = useRef();

  const openBook = useCallback((instant) => {
    setBook((b) => {
      if (b.opened) return b;
      try { localStorage.setItem(BOOK_KEY, '1'); } catch { /* storage blocked */ }
      if (instant || reduced) return { opened: true, settled: true, instant: true };
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setBook((x) => ({ ...x, settled: true })), 1500);
      return { opened: true, settled: false, instant: false };
    });
  }, [reduced]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Hash routing
  useEffect(() => {
    const onHash = () => { setRoute(readRoute()); openBook(true); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [openBook]);

  const found = SPREADS.findIndex((s) => s.key === route);
  const i = found < 0 ? 0 : found;
  const sp = SPREADS[i], prev = SPREADS[i - 1], next = SPREADS[i + 1];

  // Keyboard: ← / → turn pages
  useEffect(() => {
    const onKey = (e) => {
      if (!book.settled || /input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight' && i < SPREADS.length - 1) go(i + 1);
      if (e.key === 'ArrowLeft' && i > 0) go(i - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [book.settled, i]);

  // Page turn: move focus to the new page, then fade it in
  const leftRef = useRef(null), rightRef = useRef(null), fullRef = useRef(null);
  const prevIdx = useRef(i);
  useEffect(() => {
    const from = prevIdx.current;
    prevIdx.current = i;
    if (from === i || !book.settled) return;
    // The link that was clicked is gone, so focus would fall back to <body>.
    // Land keyboard and screen reader users on the new page's heading instead.
    const target = fullRef.current || leftRef.current?.querySelector('h1');
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
    if (reduced) return;
    const dir = i >= from ? 1 : -1;
    [leftRef, rightRef, fullRef].forEach((r, j) => r.current?.animate?.(
      [{ opacity: 0, transform: `translateX(${dir * 16}px)` }, { opacity: 1, transform: 'none' }],
      { duration: 380, delay: j === 1 ? 70 : 0, easing: 'ease-out', fill: 'backwards' },
    ));
  }, [i, book.settled, reduced]);

  // Keep the document title in sync for sharing / history
  useEffect(() => {
    document.title = sp.base === '' ? 'Evangelina Le · UX/UI Designer' : `${sp.chapter} · Evangelina Le`;
  }, [sp]);

  const { opened, settled, instant } = book;
  const flat = opened && !narrow;
  const chap = SPREADS.filter((x) => x.base === sp.base);
  const nextBase = SPREADS.slice(i + 1).find((x) => x.base !== sp.base);
  const inCase = sp.base.startsWith('work/');

  const cls = [
    'desk',
    narrow ? 'is-narrow' : 'is-wide',
    opened ? 'is-open' : 'is-closed',
    settled ? 'is-settled' : '',
    instant ? 'is-instant' : '',
    flat ? 'is-flat' : '',
    sp.full ? 'has-full' : '',
  ].join(' ');

  return (
    <div className={cls}>
      <div
        className="book"
        onClick={() => !opened && openBook(false)}
        role={opened ? undefined : 'button'}
        tabIndex={opened ? undefined : 0}
        aria-label={opened ? undefined : 'Open the sketchbook'}
        onKeyDown={(e) => { if (!opened && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openBook(false); } }}
      >
        <div className="spread">
          <div className="page page--left">
            <div ref={leftRef} className="page__inner">
              <LeftPage lp={sp.l} />
            </div>
            <span className="page__num mono" aria-hidden="true">p. {2 * i + 1}</span>
          </div>
          <div className="page page--right">
            <div ref={rightRef} className="page__inner">
              <RightPage rp={sp.r} />
            </div>
            <span className="page__num mono" aria-hidden="true">p. {2 * i + 2}</span>
          </div>
        </div>

        {sp.full && (
          <FullSpread
            key={sp.key}
            ref={fullRef}
            full={sp.full}
            narrow={narrow}
            label={`${sp.chapter}: ${sp.full.slider ? 'before and after' : sp.full.cap || 'screens'}`}
          />
        )}

        <Cover opened={opened} />

        {opened && (
          <Nav
            visible={settled}
            inCase={inCase}
            progress={`${sp.chapter} · ${chap.indexOf(sp) + 1} of ${chap.length}`}
            nextProject={nextBase && { href: '#/' + nextBase.key, label: nextBase.base.startsWith('work/') ? 'next project →' : `skip to ${nextBase.chapter} →` }}
            prev={prev && { href: '#/' + prev.key, label: prev.chapter !== sp.chapter ? `← ${prev.chapter}` : '← back' }}
            next={next && { href: '#/' + next.key, label: next.chapter !== sp.chapter ? `${next.chapter} →` : 'turn the page →' }}
          />
        )}
      </div>

      {!opened && (
        <div className="intro-hint mono">
          <span>click the sketchbook to open it</span>
          <span aria-hidden="true">·</span>
          <a href="#/" onClick={(e) => { e.preventDefault(); openBook(true); }} className="underline">skip to the work</a>
        </div>
      )}
    </div>
  );
}
