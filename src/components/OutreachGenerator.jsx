import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Copy, Check } from 'lucide-react';

const TABS = ['LinkedIn', 'Email', 'Follow-Up'];

function generateLinkedIn({ role, company, name, interest }) {
  const nameStr = name || '[Hiring Manager]';
  const roleStr = role || '[Role]';
  const companyStr = company || '[Company]';
  const interestLine = interest
    ? `I noticed ${interest} — really impressive work.`
    : `I've been following ${companyStr}'s recent growth and the direction your team is heading.`;

  return {
    text: `Hi ${nameStr},\n\n${interestLine}\n\nI recently applied for the ${roleStr} position at ${companyStr} and wanted to introduce myself directly. I bring [key differentiator] and would love to share how I could contribute to your team's goals.\n\nWould you be open to a quick conversation?\n\nBest,\n[Your Name]`,
    highlights: [nameStr, roleStr, companyStr],
  };
}

function generateEmail({ role, company, name, interest, portfolio }) {
  const nameStr = name || '[Hiring Manager]';
  const roleStr = role || '[Role]';
  const companyStr = company || '[Company]';
  const interestLine = interest
    ? `Your work on ${interest} caught my attention`
    : `${companyStr}'s approach to [specific area] resonated with me`;
  const portfolioLine = portfolio
    ? `\n\nHere's a sample of my relevant work: ${portfolio}`
    : '';

  return {
    text: `Subject: Quick note re: ${roleStr} at ${companyStr}\n\nHi ${nameStr},\n\n${interestLine}, and I wanted to reach out directly.\n\nI've just applied for the ${roleStr} role, and I believe my experience in [specific skill/achievement] aligns well with what you're building.${portfolioLine}\n\nI'd welcome the chance to discuss how I could contribute. Happy to work around your schedule.\n\nBest regards,\n[Your Name]`,
    highlights: [nameStr, roleStr, companyStr],
  };
}

function generateFollowUp({ role, company, name }) {
  const nameStr = name || '[Hiring Manager]';
  const roleStr = role || '[Role]';
  const companyStr = company || '[Company]';

  return {
    text: `Hi ${nameStr},\n\nI wanted to follow up on my message about the ${roleStr} position at ${companyStr}. I understand you're busy — just wanted to reiterate my genuine interest in the role.\n\nSince my last note, I've [new relevant accomplishment or insight about the company]. I'd love to share more about how this experience could benefit your team.\n\nNo pressure at all — if the timing isn't right, I completely understand.\n\nWarm regards,\n[Your Name]`,
    highlights: [nameStr, roleStr, companyStr],
  };
}

export default function OutreachGenerator() {
  const [ref, inView] = useInView(0.2);
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [inputs, setInputs] = useState({
    role: '',
    company: '',
    name: '',
    interest: '',
    portfolio: '',
  });

  const generators = [generateLinkedIn, generateEmail, generateFollowUp];
  const generated = generators[activeTab](inputs);

  const handleCopy = () => {
    navigator.clipboard.writeText(generated.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const update = (field) => (e) => setInputs(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <section ref={ref} className="section generator-section" id="section-6">
      <div className="section-inner">
        <h2 className="generator-title" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s ease-out',
        }}>
          Outreach <span style={{
            background: 'var(--gradient-hero)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Generator</span>
        </h2>
        <p className="generator-subtitle" style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s ease-out 0.2s',
        }}>
          Now we give you tools, not just shame.
        </p>

        <div className="generator-grid">
          <div className="generator-inputs" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.6s ease-out 0.3s',
          }}>
            <div className="gen-input-group">
              <label>Role you're applying for</label>
              <input
                className="gen-input"
                placeholder="e.g. Senior Product Manager"
                value={inputs.role}
                onChange={update('role')}
              />
            </div>
            <div className="gen-input-group">
              <label>Company</label>
              <input
                className="gen-input"
                placeholder="e.g. Stripe"
                value={inputs.company}
                onChange={update('company')}
              />
            </div>
            <div className="gen-input-group">
              <label>Hiring manager name</label>
              <input
                className="gen-input"
                placeholder="e.g. Sarah Chen"
                value={inputs.name}
                onChange={update('name')}
              />
            </div>
            <div className="gen-input-group">
              <label>Shared interest (optional)</label>
              <input
                className="gen-input"
                placeholder="e.g. your talk at SaaStr on PLG strategy"
                value={inputs.interest}
                onChange={update('interest')}
              />
            </div>
            <div className="gen-input-group">
              <label>Portfolio link (optional)</label>
              <input
                className="gen-input"
                placeholder="e.g. yoursite.com/work"
                value={inputs.portfolio}
                onChange={update('portfolio')}
              />
            </div>
          </div>

          <div className="generator-preview" style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.6s ease-out 0.4s',
          }}>
            <div className="preview-tabs">
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  className={`preview-tab ${activeTab === i ? 'active' : ''}`}
                  onClick={() => setActiveTab(i)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="preview-content">
              <button className="preview-copy-btn" onClick={handleCopy}>
                {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
              </button>
              <pre style={{
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
                margin: 0,
                paddingTop: 8,
              }}>
                {generated.text}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
