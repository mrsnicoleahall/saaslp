import { useState, useMemo } from 'react';
import { useInView } from '../hooks/useInView';
import { Check } from 'lucide-react';

const ACTIONS = [
  { key: 'resume', label: 'Tailored Resume', desc: 'Customized for this specific role', weight: 15, icon: '📄' },
  { key: 'portfolio', label: 'Portfolio / Work Samples', desc: 'Show, don\'t just tell', weight: 12, icon: '💼' },
  { key: 'outreach', label: 'Direct Outreach to HM', desc: 'Skip the line entirely', weight: 30, icon: '✉️' },
  { key: 'referral', label: 'Internal Referral', desc: 'The golden ticket', weight: 25, icon: '🤝' },
  { key: 'followup', label: 'Follow-Up Message', desc: 'Persistence pays off', weight: 18, icon: '🔄' },
];

export default function ProbabilityCalculator() {
  const [ref, inView] = useInView(0.2);
  const [checked, setChecked] = useState({
    resume: true,
    portfolio: false,
    outreach: false,
    referral: false,
    followup: false,
  });

  const score = useMemo(() => {
    let total = 0;
    ACTIONS.forEach(a => {
      if (checked[a.key]) total += a.weight;
    });
    return Math.min(total, 100);
  }, [checked]);

  const circumference = 2 * Math.PI * 90;
  const dashOffset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s < 25) return 'var(--rose)';
    if (s < 50) return 'var(--amber)';
    if (s < 75) return 'var(--green-light)';
    return 'var(--green)';
  };

  const getLabel = (s) => {
    if (s < 20) return 'Invisible';
    if (s < 40) return 'Barely Visible';
    if (s < 60) return 'Getting Noticed';
    if (s < 80) return 'Standing Out';
    return 'Impossible to Ignore';
  };

  const color = getColor(score);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  const toggle = (key) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section ref={ref} className="section calc-section section-alt" id="section-6">
      <div className="section-inner">
        <h2 className="calc-title" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s ease-out',
        }}>
          Visibility <span style={{ color: 'var(--green)' }}>Calculator</span>
        </h2>
        <p className="calc-subtitle" style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s ease-out 0.2s',
        }}>
          Check what you're willing to do. Watch your odds change.
        </p>

        <div className="calc-grid">
          <div className="calc-checklist" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.6s ease-out 0.3s',
          }}>
            {ACTIONS.map((action, i) => (
              <button
                key={action.key}
                className={`calc-check-item ${checked[action.key] ? 'checked' : ''}`}
                onClick={() => toggle(action.key)}
                style={{
                  animationDelay: `${0.3 + i * 0.08}s`,
                }}
              >
                <div className={`calc-checkbox ${checked[action.key] ? 'checked' : ''}`}>
                  {checked[action.key] && <Check size={14} strokeWidth={3} />}
                </div>
                <div className="calc-check-content">
                  <div className="calc-check-label">{action.label}</div>
                  <div className="calc-check-desc">{action.desc}</div>
                </div>
                <div className="calc-check-weight">+{action.weight}%</div>
              </button>
            ))}

            {checkedCount < 3 && (
              <div style={{
                textAlign: 'center',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                marginTop: 8,
              }}>
                Most people only check the first one. Be different.
              </div>
            )}
          </div>

          <div className="calc-meter-section" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.6s ease-out 0.4s',
          }}>
            <div className="calc-ring">
              <svg viewBox="0 0 200 200">
                <circle className="calc-ring-bg" cx="100" cy="100" r="90" />
                <circle
                  className="calc-ring-fill"
                  cx="100" cy="100" r="90"
                  stroke={color}
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <div className="calc-ring-text">
                <div className="calc-ring-percent" style={{ color }}>{score}%</div>
                <div className="calc-ring-label">Visibility Score</div>
              </div>
            </div>

            <div className="calc-status" style={{ color }}>
              {getLabel(score)}
            </div>

            <div className="calc-tip">
              {checkedCount === 5
                ? 'Maximum effort. You\'re doing everything right. Interviews incoming.'
                : checkedCount >= 3
                  ? 'You\'re ahead of 90% of applicants. Keep going.'
                  : 'Most applicants only submit a resume. You can do more.'}
            </div>

            {checkedCount >= 4 && (
              <button
                className="btn-green"
                onClick={() => {
                  const next = document.getElementById('section-7');
                  if (next) next.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  marginTop: 20,
                  padding: '12px 28px',
                  fontSize: '0.9rem',
                }}
              >
                See the leaderboard →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
