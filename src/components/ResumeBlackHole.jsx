import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useInView } from '../hooks/useInView';

export default function ResumeBlackHole() {
  const [ref, inView] = useInView(0.2);
  const [viewedCount, setViewedCount] = useState(0);
  const [interviewedCount, setInterviewedCount] = useState(0);
  const [dropped, setDropped] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [overBin, setOverBin] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const resumeRef = useRef(null);
  const binRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });
  const originPos = useRef({ x: 0, y: 0 });

  const resumes = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      dur: `${5 + Math.random() * 6}s`,
      rotation: `${-30 + Math.random() * 60}deg`,
    })), []);

  useEffect(() => {
    if (!inView) return;
    const v = setInterval(() => {
      setViewedCount(prev => prev < 0.8 ? +(prev + 0.1).toFixed(1) : 0.8);
    }, 200);
    const i = setInterval(() => {
      setInterviewedCount(prev => prev < 0.2 ? +(prev + 0.1).toFixed(1) : 0.2);
    }, 400);
    return () => { clearInterval(v); clearInterval(i); };
  }, [inView]);

  const checkOverBin = useCallback((clientX, clientY) => {
    if (!binRef.current) return false;
    const rect = binRef.current.getBoundingClientRect();
    const pad = 30;
    return (
      clientX >= rect.left - pad &&
      clientX <= rect.right + pad &&
      clientY >= rect.top - pad &&
      clientY <= rect.bottom + pad
    );
  }, []);

  const handlePointerDown = (e) => {
    if (dropped) return;
    e.preventDefault();
    e.target.setPointerCapture(e.pointerId);
    const rect = resumeRef.current.getBoundingClientRect();
    originPos.current = { x: rect.left, y: rect.top };
    startPos.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
    setPos({ x: 0, y: 0 });
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setPos({ x: dx, y: dy });
    setOverBin(checkOverBin(e.clientX, e.clientY));
  };

  const handlePointerUp = (e) => {
    if (!dragging) return;
    setDragging(false);
    if (checkOverBin(e.clientX, e.clientY)) {
      setDropped(true);
      setOverBin(false);
      setTimeout(() => {
        const next = document.getElementById('section-1');
        if (next) next.scrollIntoView({ behavior: 'smooth' });
      }, 1500);
    } else {
      setPos({ x: 0, y: 0 });
      setOverBin(false);
    }
  };

  return (
    <section ref={ref} className="section black-hole" id="section-0">
      <div className="falling-resumes">
        {resumes.map(r => (
          <div
            key={r.id}
            className="falling-resume"
            style={{
              left: r.left,
              animationDelay: r.delay,
              animationDuration: r.dur,
              '--rotation': r.rotation,
            }}
          />
        ))}
      </div>

      <div className="void-label">1,284 Applicants</div>

      <div className="bh-content" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s ease-out',
      }}>
        <h1>
          This Is Where Most<br />
          Applications <span className="gradient-text">Die.</span>
        </h1>
        <p className="bh-subtitle">
          Unread. Unseen. Unremembered.<br />
          Your resume enters a void of 1,284 applicants and hopes for the best.
        </p>

        <div className="drag-zone">
          {!dropped ? (
            <>
              <div
                ref={resumeRef}
                className={`draggable-resume ${dragging ? 'dragging' : ''}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) rotate(${dragging ? '-5deg' : '0deg'})`,
                  transition: dragging ? 'none' : 'transform 0.4s ease-out',
                  touchAction: 'none',
                }}
              >
                <div className="resume-doc">
                  <div className="resume-line w80" />
                  <div className="resume-line w60" />
                  <div className="resume-line w90" />
                  <div className="resume-line w40" />
                  <div className="resume-line w70" />
                  <div className="resume-line w50" />
                </div>
                <div className="resume-drag-hint">
                  {dragging ? 'Now drop it...' : 'Drag your resume'}
                </div>
              </div>

              <div className="drag-arrow">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>

              <div
                ref={binRef}
                className={`the-pile ${overBin ? 'active' : ''}`}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12" />
                  <path d="M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                </svg>
                <span>THE PILE</span>
              </div>
            </>
          ) : (
            <div className="dropped-msg" style={{ animation: 'fade-up 0.5s ease-out' }}>
              <div style={{
                padding: '14px 28px',
                background: 'var(--rose-bg)',
                border: '1px solid var(--rose-border)',
                borderRadius: '12px',
                color: 'var(--rose)',
                fontWeight: 600,
              }}>
                Your resume has entered the pile. Godspeed.
              </div>
            </div>
          )}
        </div>

        <div className="bh-stats" style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.8s ease-out 0.4s',
        }}>
          <div className="bh-stat">
            <div className="bh-stat-value">{viewedCount}%</div>
            <div className="bh-stat-label">Viewed</div>
          </div>
          <div className="bh-stat">
            <div className="bh-stat-value">{interviewedCount}%</div>
            <div className="bh-stat-label">Interviewed</div>
          </div>
          <div className="bh-stat">
            <div className="bh-stat-value" style={{ color: 'var(--text-muted)' }}>0</div>
            <div className="bh-stat-label">Morale Boost</div>
          </div>
        </div>
      </div>
    </section>
  );
}
