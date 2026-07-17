import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden pt-12 pb-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4f46e5]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.2] tracking-tight">
            We Build Digital <br/> Solutions That <br/>
            <span className="text-gradient">Drive Growth</span>
          </h1>
          
          <p className="text-[#888] text-base max-w-lg leading-relaxed">
            We are a full-service IT company delivering innovative, scalable and high-performance digital solutions for businesses worldwide.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button className="btn-gradient flex items-center space-x-2">
              <span>Our Services</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            
          </div>

          {/* Client Logos */}
          <div className="pt-8 flex items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-xl font-bold tracking-tight">Google</span>
            <span className="text-xl font-bold flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/></svg>
              Microsoft
            </span>
            <span className="text-xl font-bold">aws</span>
            <span className="text-xl font-bold">Clutch</span>
            <span className="text-xl font-bold">upwork</span>
          </div>
        </div>

        {/* Right Graphic - Image */}
        <div className="relative h-[300px] lg:h-[400px] w-full hidden lg:flex items-center justify-center">
          <img 
            src="/images/home-hero.jpg" 
            alt="Digital Solutions" 
            className="w-full h-full object-cover relative z-10"
          />
          {/* Gradient overlay to blend image seamlessly into the background */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#030303] z-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent z-20"></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
