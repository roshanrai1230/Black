import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Stats from '../components/Stats';
import Projects from '../components/Projects';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero />
      <Services />
      <Stats />
      <Projects />
      <CTA />
    </div>
  );
};

export default Home;
