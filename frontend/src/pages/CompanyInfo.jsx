import React from 'react';

const CompanyInfo = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative overflow-hidden border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <p className="text-[#4f46e5] text-xs font-bold tracking-widest uppercase mb-4">COMPANY INFORMATION</p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">Company Info</h1>
            <p className="text-[#888] text-lg leading-relaxed max-w-lg">
              Here you can find all the essential information about LEXVRA Technologies.
            </p>
          </div>
          {/* Building image */}
          <div className="w-full h-[300px] lg:h-[400px] relative overflow-hidden">
            <img 
              src="/images/company-hero.jpg" 
              alt="LEXVRA HQ Building" 
              className="w-full h-full object-cover"
            />
            {/* Blending gradients */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#030303]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: 'Company Name', value: 'LEXVRA Technologies Private Limited' },
              { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Founded', value: '2020' },
              { icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Company Type', value: 'Private Limited' },
              { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Registered Office', value: '123, Tech Park, Mohali, Punjab - 160055' },
              { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', label: 'GST Number', value: '29ABCDE1234F1Z5' },
              { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', label: 'CIN Number', value: 'U72900KA2020PTC123456' },
            ].map((info, i) => (
              <div key={i} className="glass-panel p-6 flex flex-col justify-between min-h-[140px] hover:border-[#4f46e5]/30 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#141414] border border-white/5 flex items-center justify-center text-[#4f46e5]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} /></svg>
                  </div>
                  <span className="text-[#888] text-xs font-bold uppercase tracking-wider">{info.label}</span>
                </div>
                <p className="text-white font-medium text-sm leading-relaxed">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-[#080808] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <h3 className="text-xl font-bold text-white mb-10 text-center md:text-left">Our Certifications</h3>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-12 opacity-60">
            {/* Mock Certification Logos */}
            <div className="flex items-center space-x-2 border border-white/20 px-4 py-2 rounded-lg">
              <span className="font-bold text-white">ISO</span>
              <span className="text-xs text-[#888]">9001:2015</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Clutch</span>
            <div className="flex flex-col items-center leading-none">
              <span className="text-xs text-[#888]">Microsoft</span>
              <span className="font-bold text-white">Partner</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tighter">aws</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CompanyInfo;
