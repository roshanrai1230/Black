import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">About LEXVRA</h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="glass-card p-6 border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">Driving Digital Transformation</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                At LEXVRA, we believe in the power of technology to reshape businesses. Founded with a vision to deliver excellence, we specialize in scalable software solutions, enterprise architecture, and next-generation cloud services.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                Our team of passionate engineers and designers work seamlessly to bring your ideas to life. We don't just build software; we engineer experiences that resonate with users and drive growth.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <h4 className="text-3xl font-bold text-indigo-400 mb-2">150+</h4>
                  <p className="text-slate-400 text-sm">Projects Delivered</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <h4 className="text-3xl font-bold text-cyan-400 mb-2">50+</h4>
                  <p className="text-slate-400 text-sm">Global Clients</p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl z-[-1]"></div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative aspect-square rounded-[2rem] bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMGYxNzJhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMWUyOTNiIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-20"></div>
                <div className="text-center z-10 p-8">
                  <div className="w-20 h-20 mx-auto bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30 mb-6">
                    <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Innovation Hub</h3>
                  <p className="text-slate-400">Where ideas turn into reality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
