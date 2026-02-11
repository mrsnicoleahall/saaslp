import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';

const BARS = [
  { label: 'Applied only (no outreach)', value: 78, color: 'var(--rose)' },
  { label: 'Applied + LinkedIn message', value: 42, color: 'var(--amber)' },
  { label: 'Applied + email to HM', value: 31, color: 'var(--green-light)' },
  { label: 'Applied + outreach + follow-up', value: 18, color: 'var(--green)' },
];

export default function Leaderboard() {
  const [ref, inView] = useInView(0.2);
  const [contactPct, setContactPct] = useState(0);
  const [responseRate, setResponseRate] = useState(0);
  const [interviews, setInterviews] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t1 = setInterval(() => setContactPct(prev => prev < 34 ? prev + 1 : 34), 40);
    const t2 = setInterval(() => setResponseRate(prev => prev < 47 ? prev + 1 : 47), 50);
    const t3 = setInterval(() => setInterviews(prev => prev < 892 ? prev + 23 : 892), 30);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, [inView]);

  return (
    <section ref={ref} className="section leaderboard-section" id="section-7">
      <div className="section-inner">
        <h2 className="lb-title" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s ease-out',
        }}>
          Live <span style={{ color: 'var(--green)' }}>Leaderboard</span>
        </h2>
        <p className="lb-subtitle" style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s ease-out 0.2s',
        }}>
          Nothing motivates like realizing strangers are out-hustling you.
        </p>

        <div className="lb-grid" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease-out 0.3s',
        }}>
          <div className="lb-card">
            <div className="lb-value" style={{ color: 'var(--green)' }}>{contactPct}%</div>
            <div className="lb-label">of users contacting<br />hiring managers</div>
          </div>
          <div className="lb-card">
            <div className="lb-value" style={{ color: 'var(--cyan)' }}>{responseRate}%</div>
            <div className="lb-label">average<br />response rate</div>
          </div>
          <div className="lb-card">
            <div className="lb-value" style={{ color: 'var(--amber)' }}>{interviews.toLocaleString()}</div>
            <div className="lb-label">interviews<br />booked this month</div>
          </div>
        </div>

        <div className="lb-bar-section" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease-out 0.5s',
        }}>
          <div style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: 24,
            textAlign: 'center',
          }}>
            % of applicants still waiting after 2 weeks
          </div>
          {BARS.map((bar, i) => (
            <div key={i} className="lb-bar-item">
              <div className="lb-bar-header">
                <span className="lb-bar-label">{bar.label}</span>
                <span className="lb-bar-value" style={{ color: bar.color }}>{bar.value}%</span>
              </div>
              <div className="lb-bar-track">
                <div
                  className="lb-bar-fill"
                  style={{
                    width: inView ? `${bar.value}%` : '0%',
                    background: bar.color,
                    transitionDelay: `${0.6 + i * 0.15}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="lb-note" style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s ease-out 1.2s',
        }}>
          Adds peer pressure. As intended.
        </p>
      </div>
    </section>
  );
}
