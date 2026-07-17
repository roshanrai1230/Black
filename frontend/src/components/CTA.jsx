import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 w-full">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="relative w-full rounded-2xl overflow-hidden glass-panel p-8 md:p-12 border-t border-[#4f46e5]/30 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#9333ea]/10 to-transparent pointer-events-none"></div>

          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-full bg-[#141414] border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_rgba(79,70,229,0.2)]">
              <span className="text-3xl">🚀</span>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Have a Project in Mind?</h2>
              <p className="text-[#888] text-sm">Let's turn your ideas into digital reality. We're ready to help you.</p>
            </div>
          </div>

          <Link to="/contact" className="btn-gradient flex items-center space-x-2 relative z-10 flex-shrink-0 w-full md:w-auto justify-center">
            <span>Let's Talk</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default CTA;
