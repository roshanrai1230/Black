import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import CTA from '../components/CTA';

const ServiceDetail = () => {
  const { id } = useParams();
  
  // Find the matching service data
  const service = servicesData.find(s => s.slug === id);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
        <Link to="/" className="text-[#4f46e5] hover:underline">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center pt-24 pb-0">
      
      {/* 1. Hero Section */}
      <section className="w-full max-w-[1400px] mx-auto px-6 mb-24 flex flex-col lg:flex-row items-center gap-16 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#9333ea]/10 to-transparent blur-[100px] pointer-events-none rounded-full"></div>
        
        <div className="w-full lg:w-1/2 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs font-medium tracking-wider uppercase mb-8">
            <Link to="/" className="text-[#4f46e5] hover:text-white transition-colors">Home</Link>
            <span className="text-[#444]">&gt;</span>
            <span className="text-[#4f46e5]">Services</span>
            <span className="text-[#444]">&gt;</span>
            <span className="text-[#888]">{service.title}</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {service.title}
          </h1>
          <p className="text-[#888] text-lg leading-relaxed mb-10 max-w-lg">
            {service.heroDescription}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button className="btn-gradient">{service.heroButtons.primary}</button>
            <button className="btn-outline border-none text-[#888] hover:text-white hover:bg-transparent">
              {service.heroButtons.secondary} &rarr;
            </button>
          </div>
        </div>

        {/* Hero Graphic Placeholder (Abstract 3D-ish vibe) */}
        <div className="w-full lg:w-1/2 relative z-10 hidden lg:flex justify-end">
          <div className="w-[500px] h-[400px] rounded-3xl bg-[#0a0a0a] border border-white/5 shadow-[0_0_50px_rgba(79,70,229,0.15)] flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4f46e5]/20 to-transparent opacity-50"></div>
            {/* Abstract shapes */}
            <div className="w-48 h-48 rounded-2xl bg-[#141414] border border-white/10 rotate-12 transform group-hover:rotate-0 transition-transform duration-700 shadow-2xl flex items-center justify-center">
               <svg className="w-20 h-20 text-[#4f46e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-[#9333ea]/20 blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#4f46e5]/20 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section className="w-full max-w-[1400px] mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.features.map((feature, idx) => (
            <div key={idx} className="glass-panel p-6 flex flex-col items-start hover:border-[#4f46e5]/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#4f46e5]/10 border border-[#4f46e5]/20 flex items-center justify-center mb-5 text-[#a78bfa]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-white font-bold mb-2">{feature.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. What We Offer */}
      <section className="w-full max-w-[1400px] mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">What We Offer</h2>
            <ul className="space-y-4">
              {service.whatWeOffer.map((offer, idx) => (
                <li key={idx} className="flex items-center text-[#888]">
                  <div className="w-2 h-2 rounded-full bg-[#4f46e5] mr-4 flex-shrink-0 shadow-[0_0_10px_#4f46e5]"></div>
                  <span className="text-[15px]">{offer}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Dashboard/Mockup Placeholder */}
          <div className="w-full h-[400px] rounded-2xl bg-[#0a0a0a] border border-white/5 relative overflow-hidden shadow-2xl p-6 flex flex-col">
            <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-bl from-[#9333ea]/10 to-transparent"></div>
            {/* Mock Header */}
            <div className="w-full flex items-center justify-between mb-8 relative z-10 border-b border-white/5 pb-4">
               <div className="flex space-x-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
               </div>
               <div className="w-32 h-2 bg-white/10 rounded-full"></div>
            </div>
            {/* Mock Body */}
            <div className="flex-1 flex gap-6 relative z-10">
               <div className="w-1/3 h-full flex flex-col gap-4">
                 <div className="w-full h-10 bg-white/5 rounded-lg"></div>
                 <div className="w-full h-10 bg-[#4f46e5]/20 rounded-lg border border-[#4f46e5]/30"></div>
                 <div className="w-full h-10 bg-white/5 rounded-lg"></div>
                 <div className="w-full h-10 bg-white/5 rounded-lg"></div>
               </div>
               <div className="w-2/3 h-full flex flex-col gap-4">
                 <div className="w-full h-32 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl border border-white/5 p-4">
                   <div className="w-1/2 h-2 bg-white/10 rounded-full mb-4"></div>
                   <div className="w-3/4 h-2 bg-white/10 rounded-full"></div>
                 </div>
                 <div className="w-full flex-1 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl border border-white/5"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Process */}
      <section className="w-full max-w-[1400px] mx-auto px-6 mb-32">
        <h2 className="text-3xl font-bold text-white mb-12">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {/* Horizontal connecting line (desktop) */}
          <div className="hidden md:block absolute top-6 left-10 right-10 h-[1px] bg-white/10"></div>
          
          {service.process.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col md:items-start group">
              <div className="text-4xl font-bold text-white/5 group-hover:text-[#4f46e5]/20 transition-colors mb-2 -mt-4 absolute -z-10">{step.step}</div>
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] border border-[#4f46e5]/50 flex items-center justify-center text-[#4f46e5] text-sm font-bold mb-6 shadow-[0_0_15px_rgba(79,70,229,0.2)] group-hover:bg-[#4f46e5] group-hover:text-white transition-all">
                {step.step}
              </div>
              <h4 className="text-white font-bold mb-2 text-lg">{step.title}</h4>
              <p className="text-[#666] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Technologies We Use */}
      <section className="w-full max-w-[1400px] mx-auto px-6 mb-24">
        <h2 className="text-3xl font-bold text-white mb-8">Technologies We Use</h2>
        <div className="flex flex-wrap gap-4">
          {service.technologies.map((tech, idx) => (
            <div key={idx} className="glass-panel px-6 py-3 rounded-full flex items-center space-x-3 hover:bg-white/5 transition-colors cursor-default">
              <div className="w-2 h-2 rounded-full bg-[#a78bfa]"></div>
              <span className="text-[#ccc] text-sm font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA Footer */}
      <CTA />
      
    </div>
  );
};

export default ServiceDetail;
