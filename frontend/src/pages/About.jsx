import React from 'react';
import CTA from '../components/CTA';

const About = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4f46e5]/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/4"></div>
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <p className="text-[#4f46e5] text-xs font-bold tracking-widest uppercase mb-4">WHO WE ARE</p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">About Us</h1>
            <p className="text-[#888] text-lg leading-relaxed max-w-lg">
              LEXVRA Technologies is a leading IT solutions company passionate about building digital products that empower businesses and create exceptional experiences.
            </p>
          </div>
          {/* Right side office image */}
          <div className="w-full h-[300px] lg:h-[400px] relative overflow-hidden">
            <img 
              src="/images/about-hero.jpg" 
              alt="LEXVRA HQ" 
              className="w-full h-full object-cover"
            />
            {/* Blending gradients */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#030303]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Mission */}
            <div className="glass-panel p-8 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f46e5]/20 to-transparent flex items-center justify-center mb-6 text-[#4f46e5] group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-[#888] text-sm leading-relaxed">
                To deliver innovative and scalable digital solutions that solve real-world problems and drive growth.
              </p>
            </div>

            {/* Vision */}
            <div className="glass-panel p-8 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9333ea]/20 to-transparent flex items-center justify-center mb-6 text-[#9333ea] group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-[#888] text-sm leading-relaxed">
                To be a global technology partner known for excellence, innovation, and client success.
              </p>
            </div>

            {/* Values */}
            <div className="glass-panel p-8 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f46e5]/20 to-transparent flex items-center justify-center mb-6 text-[#4f46e5] group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Values</h3>
              <ul className="text-[#888] text-sm leading-relaxed list-disc list-inside space-y-1">
                <li>Innovation</li>
                <li>Integrity</li>
                <li>Collaboration</li>
                <li>Excellence</li>
              </ul>
            </div>

            {/* Why Choose Us */}
            <div className="glass-panel p-8 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9333ea]/20 to-transparent flex items-center justify-center mb-6 text-[#9333ea] group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Why Choose Us</h3>
              <p className="text-[#888] text-sm leading-relaxed">
                We combine technical expertise with creative thinking to deliver solutions that make a difference.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-[#080808] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Our Journey</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-4 left-0 w-full h-[2px] bg-gradient-to-r from-[#4f46e5]/10 via-[#4f46e5] to-[#4f46e5]/10"></div>
            
            {[
              { year: '2020', title: 'Founded', desc: 'LEXVRA Technologies was founded with a vision to innovate.' },
              { year: '2021', title: 'Growing Team', desc: 'Expanded our team and delivered 50+ projects successfully.' },
              { year: '2022', title: 'Global Reach', desc: 'Started working with international clients across the globe.' },
              { year: '2024', title: 'Future Ready', desc: 'Investing in AI, Cloud and next-gen tech for the future.' },
            ].map((item, i) => (
              <div key={i} className="relative pt-8 md:pt-12">
                {/* Dot */}
                <div className="absolute top-0 md:-top-1 left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-[#4f46e5] shadow-[0_0_10px_#4f46e5]"></div>
                {/* Content */}
                <div className="pl-12 md:pl-0 md:text-center">
                  <h4 className="text-[#4f46e5] font-bold text-lg mb-1">{item.year}</h4>
                  <h5 className="text-white font-bold mb-2">{item.title}</h5>
                  <p className="text-[#888] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default About;
