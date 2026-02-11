import { useInView } from '../hooks/useInView';
import { ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ConversionCTA() {
  const [ref, inView] = useInView(0.2);

  const handleClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#29866C', '#34a885', '#0891b2', '#d4880a', '#7c5cbf'],
    });
  };

  return (
    <section ref={ref} className="section cta-section" id="section-8">
      <div className="cta-content" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s ease-out',
      }}>
        <h2>
          You can stay in<br />
          <span style={{ color: 'var(--text-muted)' }}>the pile.</span>
        </h2>
        <div className="cta-lines">
          <p className="cta-line">Or you can <span style={{
            color: 'var(--green)',
            fontWeight: 700,
          }}>introduce yourself.</span></p>
        </div>

        <div className="cta-buttons">
          <button
            className="btn-green"
            onClick={handleClick}
            style={{
              padding: '18px 40px',
              fontSize: '1.1rem',
              borderRadius: '14px',
              minWidth: 300,
              justifyContent: 'center',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.3s',
            }}
          >
            Get Started For Free
            <ArrowRight size={20} />
          </button>
        </div>

        <p style={{
          marginTop: 48,
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s ease-out 1s',
        }}>
          The difference between getting hired and getting ghosted<br />
          is often just one message.
        </p>
      </div>
    </section>
  );
}
