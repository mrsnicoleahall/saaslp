import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { Star } from 'lucide-react';

const EMAILS = [
  { from: 'SaaS Vendor', subject: 'RE: Your license renewal is coming up...', avatar: 'SV', color: 'var(--rose-bg)', avatarColor: 'var(--rose)', time: '2:34 PM' },
  { from: 'Jira Notifications', subject: '[PROJ-2847] Sprint review moved to Thursday', avatar: 'JN', color: 'rgba(212, 136, 10, 0.08)', avatarColor: 'var(--amber)', time: '2:12 PM' },
  { from: 'HR Team', subject: 'Updated PTO policy — please review', avatar: 'HR', color: 'var(--green-bg)', avatarColor: 'var(--green)', time: '1:45 PM' },
  { from: 'Recruiter', subject: 'FW: 47 new applicants for Demand Gen role', avatar: 'RC', color: 'rgba(124, 92, 191, 0.08)', avatarColor: 'var(--violet)', time: '1:20 PM' },
  { from: 'You', subject: '', avatar: 'YOU', color: 'var(--green-bg)', avatarColor: 'var(--green)', time: 'Just now', isUser: true },
];

const SUBJECT_LINES = [
  "Quick question about your CX transformation roadmap",
  "Saw your recent product launch. Had an idea.",
  "Applicant for Demand Gen Role — with a twist",
  "Your team's growth caught my eye. Can I help?",
];

export default function DirectOutreach() {
  const [ref, inView] = useInView(0.2);
  const [subjectIndex, setSubjectIndex] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [emailsRevealed, setEmailsRevealed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setEmailsRevealed(prev => Math.min(prev + 1, EMAILS.length));
    }, 400);
    return () => clearInterval(t);
  }, [inView]);

  useEffect(() => {
    if (emailsRevealed >= EMAILS.length) {
      const t = setTimeout(() => setShowStats(true), 800);
      return () => clearTimeout(t);
    }
  }, [emailsRevealed]);

  // Auto-advance after stats appear
  useEffect(() => {
    if (!showStats) return;
    const t = setTimeout(() => {
      const next = document.getElementById('section-5');
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    }, 4000);
    return () => clearTimeout(t);
  }, [showStats]);

  useEffect(() => {
    const t = setInterval(() => {
      setSubjectIndex(prev => (prev + 1) % SUBJECT_LINES.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="section outreach-section" id="section-4">
      <div className="section-inner">
        <h2 className="outreach-title" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s ease-out',
        }}>
          Apply + <span style={{ color: 'var(--green)' }}>Contact the Hiring Manager</span>
        </h2>

        <div className="inbox-visual" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease-out 0.2s',
        }}>
          <div className="inbox-header">
            <div className="inbox-header-dot" style={{ background: '#e05270' }} />
            <div className="inbox-header-dot" style={{ background: '#d4880a' }} />
            <div className="inbox-header-dot" style={{ background: '#29866C' }} />
            <span className="inbox-title">Hiring Manager's Inbox</span>
          </div>
          <div className="inbox-emails">
            {EMAILS.map((email, i) => {
              const revealed = i < emailsRevealed;
              return (
                <div
                  key={i}
                  className={`inbox-email ${revealed ? (email.isUser ? 'highlighted' : 'dimmed') : ''}`}
                  style={{
                    opacity: revealed ? undefined : 0,
                    transition: 'all 0.4s ease-out',
                  }}
                >
                  <div className="email-avatar" style={{ background: email.color, color: email.avatarColor }}>
                    {email.avatar}
                  </div>
                  <div className="email-content">
                    <div className="email-from">{email.from}</div>
                    <div className="email-subject">
                      {email.isUser ? SUBJECT_LINES[subjectIndex] : email.subject}
                    </div>
                  </div>
                  <span className="email-time">{email.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {showStats && (
          <>
            <div className="stats-overlay" style={{ animation: 'fade-up 0.8s ease-out' }}>
              <div className="stat-card">
                <div className="stat-value green">+220%</div>
                <div className="stat-label">Visibility</div>
              </div>
              <div className="stat-card">
                <div className="stat-value cyan">+65%</div>
                <div className="stat-label">Response Likelihood</div>
              </div>
              <div className="stat-card">
                <div className="stat-value violet">3X</div>
                <div className="stat-label">Interview Likelihood</div>
              </div>
            </div>

            <div className="known-candidate" style={{ animation: 'fade-up 0.8s ease-out 0.3s both' }}>
              <div className="known-badge">
                <Star size={18} />
                Known Candidate
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
