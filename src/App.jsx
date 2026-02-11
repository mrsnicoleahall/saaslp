import { useState, useEffect } from 'react';
import './App.css';
import ResumeBlackHole from './components/ResumeBlackHole';
import ForkInTheRoad from './components/ForkInTheRoad';
import PassiveFunnel from './components/PassiveFunnel';
import Rewind from './components/Rewind';
import DirectOutreach from './components/DirectOutreach';
import SocialProof from './components/SocialProof';
import ProbabilityCalculator from './components/ProbabilityCalculator';
import Leaderboard from './components/Leaderboard';
import ConversionCTA from './components/ConversionCTA';

const TOTAL_SECTIONS = 9;

function ProgressNav({ activeSection }) {
  return (
    <nav className="progress-nav">
      {Array.from({ length: TOTAL_SECTIONS }, (_, i) => (
        <button
          key={i}
          className={`progress-dot ${activeSection === i ? 'active' : ''}`}
          onClick={() => {
            document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label={`Go to section ${i + 1}`}
        />
      ))}
    </nav>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[id^="section-"]');
      let closest = 0;
      let closestDist = Infinity;
      sections.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveSection(closest);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <ProgressNav activeSection={activeSection} />
      <ResumeBlackHole />
      <ForkInTheRoad />
      <PassiveFunnel />
      <Rewind />
      <DirectOutreach />
      <SocialProof />
      <ProbabilityCalculator />
      <Leaderboard />
      <ConversionCTA />
    </div>
  );
}
