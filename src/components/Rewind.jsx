import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';

export default function Rewind() {
  const [ref, inView] = useInView(0.3);
  const [spinning, setSpinning] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setSpinning(true);
    setShowOverlay(true);
    const t = setTimeout(() => {
      setSpinning(false);
      setShowOverlay(false);
    }, 3000);
    return () => clearTimeout(t);
  }, [inView]);

  // Auto-advance after rewind animation
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      const next = document.getElementById('section-4');
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    }, 4000);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section ref={ref} className="section rewind-section" id="section-3">
      <div className={`rewind-overlay ${showOverlay ? 'active' : ''}`} />

      <div className="rewind-content" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s ease-out',
      }}>
        <div className="rewind-tape">
          <div className={`tape-reel ${spinning ? 'spinning' : ''}`} />
          <div className="tape-line" />
          <div className={`tape-reel ${spinning ? 'spinning' : ''}`} />
        </div>

        <h2>
          Let's try that again...<br />
          <span style={{ color: 'var(--green)' }}>differently.</span>
        </h2>

        <p>Users love redemption arcs.</p>
      </div>
    </section>
  );
}
