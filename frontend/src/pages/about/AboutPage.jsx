import React from 'react';
import AboutHero from '../../components/about/AboutHero';
import MissionVision from '../../components/about/MissionVision';
import CoreValues from '../../components/about/CoreValues';
import TeamSection from '../../components/about/TeamSection';
import ApproachSection from '../../components/about/ApproachSection';
import CTASection from '../../components/sections/CTASection';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <MissionVision />
      <CoreValues />
      <TeamSection />
      <ApproachSection />
      <CTASection />
    </div>
  );
};

export default AboutPage; 