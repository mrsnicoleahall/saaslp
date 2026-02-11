import { useInView } from '../hooks/useInView';
import { Clock, Send } from 'lucide-react';

export default function ForkInTheRoad() {
  const [ref, inView] = useInView(0.2);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="section fork-section section-alt" id="section-1">
      <div className="section-inner" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s ease-out',
      }}>
        <h2 className="fork-title">Choose Your Path</h2>
        <p className="fork-subtitle">No neutral option. Because neutrality is how people stay unemployed longer than necessary.</p>

        <div className="fork-paths">
          <div
            className="fork-card fork-card-a"
            onClick={() => scrollTo('section-2')}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.6s ease-out 0.2s',
            }}
          >
            <div className="fork-icon fork-icon-a">
              <Clock size={28} />
            </div>
            <h3>Apply and Wait</h3>
            <p>Submit your application and hope the algorithm is kind today.</p>
            <span className="fork-label fork-label-a">Path A</span>
          </div>

          <div
            className="fork-card fork-card-b"
            onClick={() => scrollTo('section-2')}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.6s ease-out 0.4s',
            }}
          >
            <div className="fork-icon fork-icon-b">
              <Send size={28} />
            </div>
            <h3>Apply + Contact Hiring Manager</h3>
            <p>Submit your application then make sure a real human actually sees it.</p>
            <span className="fork-label fork-label-b">Path B</span>
          </div>
        </div>

        <p className="fork-disclaimer">One of these paths has a 3X higher interview rate. Keep scrolling to find out which.</p>
      </div>
    </section>
  );
}
