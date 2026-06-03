import React from 'react';
import Hero from './components/public/Hero';
import QuoteSection from './components/public/QuoteSection';
import ProjectSection from './components/public/ProjectSection';
import ExperienceSection from './components/public/ExperienceSection';
import SkillsSection from './components/public/SkillsSection';
import AboutSection from './components/public/AboutSection';
import ContactSection from './components/public/ContactSection';
import BlogSection from './components/public/BlogSection';

export default function PortfolioHero() {
  // अब कोई डेटा फेचिंग यहाँ नहीं होगी, 
  // सब कुछ संबंधित कंपोनेंट्स के अंदर Redux के जरिए हो रहा है।

  return (
    <div className="min-h-screen bg-[#282c33] text-white font-mono selection:bg-[#c778dd] selection:text-black overflow-x-hidden">
      <main className="max-w-6xl mx-auto px-8 pt-12 pb-24 relative">
        <Hero />
        <QuoteSection />
        <ProjectSection />
        <ExperienceSection />
        <SkillsSection />
        <AboutSection />
        <BlogSection />
        <ContactSection />
      </main>
    </div>
  );
}