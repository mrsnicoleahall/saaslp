import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';

const STORIES = [
  {
    initials: 'MK',
    name: 'Marketing Manager',
    role: 'B2B SaaS',
    color: 'var(--green-bg)',
    textColor: 'var(--green)',
    outcome: 'Reached out to VP of Marketing → <strong>invited to interview before the role officially closed</strong>',
    tag: 'Early Access',
    tagColor: 'var(--green-bg)',
    tagText: 'var(--green)',
    story: 'Found the hiring manager on LinkedIn, noticed they posted about a campaign challenge. Sent a message with a specific idea for their funnel. Got a reply within 2 hours asking to chat. The job posting hadn\'t even gone public yet.',
  },
  {
    initials: 'JR',
    name: 'Product Designer',
    role: 'Fintech Startup',
    color: 'rgba(8, 145, 178, 0.08)',
    textColor: 'var(--cyan)',
    outcome: 'Hiring manager <strong>flagged resume directly to recruiter</strong> with a note: "Talk to this person"',
    tag: 'Fast-Tracked',
    tagColor: 'rgba(8, 145, 178, 0.08)',
    tagText: 'var(--cyan)',
    story: 'Sent a short email to the design lead referencing their recent app redesign and attached a 2-page case study of a similar project. The lead forwarded it to HR the same day, bypassing the normal screening queue.',
  },
  {
    initials: 'AL',
    name: 'Data Analyst',
    role: 'Enterprise Tech',
    color: 'rgba(212, 136, 10, 0.08)',
    textColor: 'var(--amber)',
    outcome: '<strong>Skipped the first screening round entirely</strong> — went straight to hiring manager interview',
    tag: 'Skip the Line',
    tagColor: 'rgba(212, 136, 10, 0.08)',
    tagText: 'var(--amber)',
    story: 'After applying online, sent a LinkedIn message to the analytics director with a quick insight about their public dashboard metrics. The director replied asking if they could schedule a call that week. Never spoke to a recruiter first.',
  },
];

export default function SocialProof() {
  const [ref, inView] = useInView(0.2);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [readCount, setReadCount] = useState(0);

  const handleCardClick = (i) => {
    if (expandedIndex !== i) {
      setExpandedIndex(i);
      setReadCount(prev => {
        const newCount = prev + 1;
        // After reading 2+ stories, auto-advance after a moment
        if (newCount >= 2) {
          setTimeout(() => {
            const next = document.getElementById('section-6');
            if (next) next.scrollIntoView({ behavior: 'smooth' });
          }, 2000);
        }
        return newCount;
      });
    } else {
      setExpandedIndex(-1);
    }
  };

  return (
    <section ref={ref} className="section proof-section" id="section-5">
      <div className="section-inner">
        <h2 className="proof-title" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s ease-out',
        }}>
          It Works. <span style={{ color: 'var(--green)' }}>Here's Proof.</span>
        </h2>
        <p className="proof-subtitle" style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s ease-out 0.2s',
        }}>
          Because humans trust strangers on the internet more than statistics.
        </p>

        <div className="proof-cards">
          {STORIES.map((story, i) => (
            <div
              key={i}
              className={`proof-card ${expandedIndex === i ? 'expanded' : ''}`}
              onClick={() => handleCardClick(i)}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(40px)',
                transition: `all 0.6s ease-out ${0.2 + i * 0.15}s`,
              }}
            >
              <div className="proof-card-header">
                <div className="proof-avatar" style={{ background: story.color, color: story.textColor }}>
                  {story.initials}
                </div>
                <div className="proof-meta">
                  <div className="proof-name">{story.name}</div>
                  <div className="proof-role">{story.role}</div>
                </div>
                <span className="proof-tag" style={{ background: story.tagColor, color: story.tagText }}>
                  {story.tag}
                </span>
              </div>
              <div className="proof-outcome" dangerouslySetInnerHTML={{ __html: story.outcome }} />
              <div className="proof-expand">
                {story.story}
              </div>
              <div style={{
                marginTop: 12,
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
              }}>
                {expandedIndex === i ? 'Click to collapse' : 'Click to read full story'}
              </div>
            </div>
          ))}
        </div>

        {readCount >= 2 && (
          <div style={{
            textAlign: 'center',
            marginTop: 32,
            animation: 'fade-up 0.5s ease-out',
          }}>
            <button
              className="btn-green"
              onClick={(e) => {
                e.stopPropagation();
                const next = document.getElementById('section-6');
                if (next) next.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ padding: '12px 28px', fontSize: '0.9rem' }}
            >
              Convinced? Check your own odds →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
