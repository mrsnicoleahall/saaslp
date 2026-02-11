import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';

const FUNNEL_DATA = [
  { label: 'Applicants', count: 1284, pct: 100, color: '#29866C' },
  { label: 'ATS Filters', count: 312, pct: 24.3, color: '#34a885' },
  { label: 'Recruiter Screen', count: 47, pct: 3.7, color: '#d4880a' },
  { label: 'HM Review', count: 12, pct: 0.93, color: '#e07040' },
  { label: 'Interviews', count: 5, pct: 0.39, color: '#e05270' },
  { label: 'Offer', count: 1, pct: 0.08, color: '#c0405e' },
];

export default function PassiveFunnel() {
  const [ref, inView] = useInView(0.2);
  const [step, setStep] = useState(0);
  const [resumeState, setResumeState] = useState('visible');

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setStep(prev => {
        if (prev >= FUNNEL_DATA.length + 2) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(timer);
  }, [inView]);

  useEffect(() => {
    if (step >= FUNNEL_DATA.length) {
      setResumeState('flickering');
      const t = setTimeout(() => setResumeState('gone'), 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  // Auto-advance after animation completes
  useEffect(() => {
    if (resumeState !== 'gone') return;
    const t = setTimeout(() => {
      const next = document.getElementById('section-3');
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    }, 3500);
    return () => clearTimeout(t);
  }, [resumeState]);

  return (
    <section ref={ref} className="section funnel-section" id="section-2">
      <div className="section-inner">
        <h2 className="funnel-title">
          The Passive Funnel
          <span className={`user-resume-icon ${resumeState}`} />
        </h2>

        <div className="funnel-container">
          {FUNNEL_DATA.map((item, i) => (
            <div key={item.label}>
              {i > 0 && step > i && (
                <div className="funnel-arrow" style={{ animationDelay: `${i * 0.3}s` }}>
                  ↓
                </div>
              )}
              {step > i && (
                <div
                  className="funnel-step"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  <span className="funnel-label">{item.label}</span>
                  <div className="funnel-bar-wrap">
                    <div
                      className="funnel-bar"
                      style={{
                        width: `${Math.max(item.pct, 8)}%`,
                        background: item.color,
                        justifyContent: 'center',
                      }}
                    >
                      <span className="funnel-number">{item.count.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {resumeState === 'gone' && (
          <div className="funnel-result" style={{ animationDelay: '0.5s' }}>
            <h3>
              "You were <span className="emphasis">qualified</span>."<br />
              "You were <span className="emphasis">relevant</span>."<br />
              "You were <span className="emphasis">invisible</span>."
            </h3>
          </div>
        )}

        {resumeState === 'gone' && (
          <div className="funnel-violin">
            A tiny violin plays somewhere in the UX.
          </div>
        )}
      </div>
    </section>
  );
}
