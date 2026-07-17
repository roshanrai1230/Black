import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="w-full flex flex-col items-center pt-20 pb-20">
      
      {/* Main 404 Content */}
      <section className="w-full max-w-[1400px] mx-auto px-6 mb-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#4f46e5]/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Text Content (Left) */}
        <div className="w-full lg:w-1/2 relative z-10">
          <p className="text-[#4f46e5] text-sm font-bold tracking-widest uppercase mb-4">
            Oops! Page Not Found
          </p>
          <h1 className="text-[120px] lg:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#9333ea] leading-none mb-6 drop-shadow-[0_0_30px_rgba(79,70,229,0.3)]">
            404
          </h1>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Looks like you're lost in the <span className="text-[#9333ea]">digital universe.</span>
          </h2>
          <p className="text-[#888] text-lg leading-relaxed mb-10 max-w-lg">
            The page you're looking for doesn't exist or has been moved. Don't worry, let's get you back on track!
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link to="/" className="btn-gradient flex items-center space-x-2 px-8 py-3.5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span>Back to Home</span>
            </Link>
            <Link to="/services/custom-web-application" className="btn-outline flex items-center space-x-2 px-8 py-3.5 border-white/20 text-white hover:border-[#4f46e5]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              <span>Explore Services</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2 text-[#888] text-sm">
            <svg className="w-5 h-5 text-[#4f46e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Still need help?</span>
            <Link to="/contact" className="text-[#4f46e5] hover:underline flex items-center space-x-1">
              <span>Contact our support team</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        </div>

        {/* Graphic (Right) */}
        <div className="w-full lg:w-1/2 relative z-10 flex justify-center lg:justify-end">
          {/* A CSS representation of the 3D graphic in the image */}
          <div className="relative w-full max-w-[500px] h-[500px] flex items-center justify-center">
            
            {/* The floating base platform */}
            <div className="absolute bottom-10 w-full h-[150px] bg-[#0a0a0a] rounded-[50%] border-t-2 border-[#9333ea]/30 shadow-[0_20px_50px_rgba(147,51,234,0.15)] flex items-center justify-center transform rotate-x-[60deg]">
               <div className="w-[80%] h-[80%] rounded-[50%] border border-[#4f46e5]/40 border-dashed"></div>
            </div>

            {/* Floating '404' Cubes */}
            <div className="absolute top-1/4 right-10 w-24 h-24 bg-[#141414] border border-[#9333ea]/40 rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.2)] flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-700">
               <span className="text-3xl font-black text-[#9333ea]">404</span>
            </div>
            
            {/* The Astronaut/Robot Placeholder */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Tooltip bubble */}
              <div className="absolute -top-16 -left-32 bg-[#0a0a0a] border border-[#4f46e5]/40 rounded-2xl p-4 shadow-xl">
                <p className="text-white text-sm whitespace-nowrap">Hmm... can't</p>
                <p className="text-[#888] text-sm whitespace-nowrap">seem to find this</p>
                <p className="text-[#888] text-sm">page!</p>
                {/* Pointer */}
                <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#0a0a0a] border-t border-r border-[#4f46e5]/40 transform rotate-45 -translate-y-1/2"></div>
              </div>
              
              {/* Main character abstract */}
              <div className="w-48 h-64 relative animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-white/10 mx-auto shadow-2xl flex items-center justify-center relative overflow-hidden">
                   {/* Visor */}
                   <div className="w-24 h-12 bg-[#030303] rounded-xl flex items-center justify-center border border-white/5">
                     <span className="text-[#4f46e5] text-2xl font-black tracking-widest opacity-80">404</span>
                   </div>
                </div>
                {/* Body */}
                <div className="w-24 h-28 bg-gradient-to-b from-[#141414] to-[#0a0a0a] border border-white/5 mx-auto -mt-4 rounded-3xl relative z-[-1] shadow-xl"></div>
                {/* Arm holding magnifying glass */}
                <div className="absolute top-32 -left-8 w-16 h-4 bg-white/5 rounded-full transform -rotate-45 flex items-center">
                   <div className="w-12 h-12 rounded-full border-4 border-[#4f46e5] absolute -left-10 -top-4 bg-[#030303]/50 backdrop-blur-sm"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
        
      </section>

      {/* Helpful Links (Bottom Bar) */}
      <section className="w-full max-w-[1400px] mx-auto px-6">
        <div className="glass-panel w-full p-8 rounded-2xl flex flex-col items-center">
          <h3 className="text-[#4f46e5] font-bold text-lg mb-8">Helpful Links</h3>
          <div className="w-full flex flex-wrap items-center justify-center gap-y-6 gap-x-4 md:gap-x-0 md:justify-around">
            
            <Link to="/about" className="flex items-center space-x-3 text-[#888] hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/5 flex items-center justify-center group-hover:border-[#4f46e5]/50 group-hover:text-[#4f46e5] transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <span className="font-medium">About Us</span>
            </Link>

            {/* Divider */}
            <div className="hidden md:block w-[1px] h-10 bg-white/5"></div>

            <Link to="/services/custom-web-application" className="flex items-center space-x-3 text-[#888] hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/5 flex items-center justify-center group-hover:border-[#4f46e5]/50 group-hover:text-[#4f46e5] transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </div>
              <span className="font-medium">Our Services</span>
            </Link>

            {/* Divider */}
            <div className="hidden md:block w-[1px] h-10 bg-white/5"></div>

            <Link to="/careers" className="flex items-center space-x-3 text-[#888] hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/5 flex items-center justify-center group-hover:border-[#4f46e5]/50 group-hover:text-[#4f46e5] transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <span className="font-medium">Careers</span>
            </Link>

            {/* Divider */}
            <div className="hidden md:block w-[1px] h-10 bg-white/5"></div>

            <Link to="/company-info" className="flex items-center space-x-3 text-[#888] hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/5 flex items-center justify-center group-hover:border-[#4f46e5]/50 group-hover:text-[#4f46e5] transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <span className="font-medium">Company Info</span>
            </Link>

            {/* Divider */}
            <div className="hidden md:block w-[1px] h-10 bg-white/5"></div>

            <Link to="/contact" className="flex items-center space-x-3 text-[#888] hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/5 flex items-center justify-center group-hover:border-[#4f46e5]/50 group-hover:text-[#4f46e5] transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <span className="font-medium">Contact Us</span>
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
};

export default NotFound;
